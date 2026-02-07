/* ============================================
   BauMeister - 3D Game Engine
   Three.js scene, world, buildings, player
   ============================================ */

window.GameEngine = (function () {
    'use strict';

    // ---- Config ----
    const CONFIG = {
        WORLD_SIZE: 80,
        PLAYER_SPEED: 0.18,
        PLAYER_RUN_SPEED: 0.3,
        CAMERA_HEIGHT: 12,
        CAMERA_DISTANCE: 18,
        CAMERA_ANGLE: Math.PI / 6,
        INTERACTION_DISTANCE: 7,
        BUILDING_RADIUS: 22,
        FOG_NEAR: 30,
        FOG_FAR: 100,
        GROUND_COLOR: 0x5a8f3c,
        SKY_TOP: 0x87ceeb,
        SKY_BOTTOM: 0xc9e8f7,
        AMBIENT_LIGHT: 0xffffff,
        SUN_COLOR: 0xfff5e6,
    };

    // ---- Building definitions ----
    const BUILDING_DEFS = [
        {
            id: 'gefuehl',
            name: 'Gefühls-Werkstatt',
            icon: '\u2764',
            color: 0xf59e0b,
            cssColor: '#f59e0b',
            description: 'Hier lernst du, deine Gefühle zu erkennen, zu verstehen und gut mit ihnen umzugehen.',
            angle: 0,
        },
        {
            id: 'freundschaft',
            name: 'Brücke der Freundschaft',
            icon: '\u{1F91D}',
            color: 0x3b82f6,
            cssColor: '#3b82f6',
            description: 'Baue Brücken zu anderen Menschen und lerne, wie Freundschaft funktioniert.',
            angle: (2 * Math.PI) / 5,
        },
        {
            id: 'staerke',
            name: 'Turm der Stärke',
            icon: '\u{1F4AA}',
            color: 0x10b981,
            cssColor: '#10b981',
            description: 'Entdecke deine Stärken und baue Selbstvertrauen auf – Stein für Stein.',
            angle: (4 * Math.PI) / 5,
        },
        {
            id: 'worte',
            name: 'Haus der Worte',
            icon: '\u{1F4AC}',
            color: 0x8b5cf6,
            cssColor: '#8b5cf6',
            description: 'Lerne, dich klar auszudrücken und anderen wirklich zuzuhören.',
            angle: (6 * Math.PI) / 5,
        },
        {
            id: 'ruhe',
            name: 'Garten der Ruhe',
            icon: '\u{1F33F}',
            color: 0x06b6d4,
            cssColor: '#06b6d4',
            description: 'Finde innere Ruhe und lerne Strategien, um mit Stress umzugehen.',
            angle: (8 * Math.PI) / 5,
        },
    ];

    // ---- State ----
    let scene, camera, renderer, clock;
    let player, playerMixer;
    let buildings3D = [];
    let decorations = [];
    let particles = [];
    let keys = {};
    let mouseDown = false;
    let mouseX = 0, prevMouseX = 0;
    let cameraAngle = 0;
    let nearBuilding = null;
    let animationId = null;
    let isRunning = false;
    let onInteract = null;
    let playerAngle = 0;

    // ---- Initialization ----
    function init(canvas, interactCallback) {
        onInteract = interactCallback;

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xc9e8f7, CONFIG.FOG_NEAR, CONFIG.FOG_FAR);

        // Camera
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        clock = new THREE.Clock();

        // Build world
        createSky();
        createLights();
        createGround();
        createBuildings();
        createDecorations();
        createParticles();
        createPlayer();

        // Input
        setupInput(canvas);

        // Start loop
        updateCamera();
        animate();

        // Resize
        window.addEventListener('resize', onResize);
    }

    // ---- Sky ----
    function createSky() {
        const skyGeo = new THREE.SphereGeometry(90, 32, 15);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(CONFIG.SKY_TOP) },
                bottomColor: { value: new THREE.Color(CONFIG.SKY_BOTTOM) },
                offset: { value: 10 },
                exponent: { value: 0.4 },
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(skyGeo, skyMat));

        // Clouds
        for (let i = 0; i < 12; i++) {
            const cloud = createCloud();
            cloud.position.set(
                (Math.random() - 0.5) * 120,
                30 + Math.random() * 15,
                (Math.random() - 0.5) * 120
            );
            cloud.rotation.y = Math.random() * Math.PI;
            cloud.userData.speed = 0.005 + Math.random() * 0.01;
            scene.add(cloud);
            decorations.push(cloud);
        }
    }

    function createCloud() {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            roughness: 1,
        });
        const count = 4 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
            const size = 2 + Math.random() * 3;
            const geo = new THREE.SphereGeometry(size, 8, 6);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 4
            );
            mesh.scale.y = 0.6;
            group.add(mesh);
        }
        return group;
    }

    // ---- Lights ----
    function createLights() {
        const ambient = new THREE.AmbientLight(CONFIG.AMBIENT_LIGHT, 0.5);
        scene.add(ambient);

        const sun = new THREE.DirectionalLight(CONFIG.SUN_COLOR, 1.2);
        sun.position.set(30, 40, 20);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 100;
        sun.shadow.camera.left = -40;
        sun.shadow.camera.right = 40;
        sun.shadow.camera.top = 40;
        sun.shadow.camera.bottom = -40;
        sun.shadow.bias = -0.001;
        scene.add(sun);

        const hemisphere = new THREE.HemisphereLight(0x87ceeb, 0x5a8f3c, 0.3);
        scene.add(hemisphere);
    }

    // ---- Ground ----
    function createGround() {
        // Main ground
        const groundGeo = new THREE.CircleGeometry(CONFIG.WORLD_SIZE, 64);
        const groundMat = new THREE.MeshStandardMaterial({
            color: CONFIG.GROUND_COLOR,
            roughness: 0.9,
            metalness: 0,
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Construction site area (dirt patch in center)
        const dirtGeo = new THREE.CircleGeometry(CONFIG.BUILDING_RADIUS + 10, 48);
        const dirtMat = new THREE.MeshStandardMaterial({
            color: 0xc4a56e,
            roughness: 1,
            metalness: 0,
        });
        const dirt = new THREE.Mesh(dirtGeo, dirtMat);
        dirt.rotation.x = -Math.PI / 2;
        dirt.position.y = 0.02;
        dirt.receiveShadow = true;
        scene.add(dirt);

        // Center platform
        const platGeo = new THREE.CylinderGeometry(3, 3.5, 0.5, 8);
        const platMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6 });
        const platform = new THREE.Mesh(platGeo, platMat);
        platform.position.y = 0.25;
        platform.castShadow = true;
        platform.receiveShadow = true;
        scene.add(platform);

        // Sign post at center
        const signGroup = new THREE.Group();
        const postGeo = new THREE.CylinderGeometry(0.15, 0.15, 3, 8);
        const postMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.y = 1.5;
        post.castShadow = true;
        signGroup.add(post);

        const boardGeo = new THREE.BoxGeometry(3, 1.2, 0.15);
        const boardMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
        const board = new THREE.Mesh(boardGeo, boardMat);
        board.position.y = 3.2;
        board.castShadow = true;
        signGroup.add(board);

        scene.add(signGroup);

        // Paths to buildings
        BUILDING_DEFS.forEach((def) => {
            createPath(0, 0, Math.cos(def.angle) * CONFIG.BUILDING_RADIUS, Math.sin(def.angle) * CONFIG.BUILDING_RADIUS);
        });
    }

    function createPath(x1, z1, x2, z2) {
        const dx = x2 - x1;
        const dz = z2 - z1;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);

        const pathGeo = new THREE.PlaneGeometry(length, 2.5);
        const pathMat = new THREE.MeshStandardMaterial({
            color: 0xb8976a,
            roughness: 1,
        });
        const path = new THREE.Mesh(pathGeo, pathMat);
        path.rotation.x = -Math.PI / 2;
        path.rotation.z = -angle;
        path.position.set((x1 + x2) / 2, 0.03, (z1 + z2) / 2);
        path.receiveShadow = true;
        scene.add(path);
    }

    // ---- Buildings ----
    function createBuildings() {
        BUILDING_DEFS.forEach((def, index) => {
            const x = Math.cos(def.angle) * CONFIG.BUILDING_RADIUS;
            const z = Math.sin(def.angle) * CONFIG.BUILDING_RADIUS;

            const group = new THREE.Group();
            group.position.set(x, 0, z);
            group.userData = { buildingIndex: index, def: def, progress: 0 };

            // Platform
            const platGeo = new THREE.CylinderGeometry(4, 4.5, 0.4, 6);
            const platMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.7 });
            const plat = new THREE.Mesh(platGeo, platMat);
            plat.position.y = 0.2;
            plat.castShadow = true;
            plat.receiveShadow = true;
            group.add(plat);

            // Building structure (changes with progress)
            const buildingGroup = new THREE.Group();
            buildingGroup.name = 'structure';
            group.add(buildingGroup);

            // Scaffolding
            createScaffolding(group, def.color);

            // Sign
            createBuildingSign(group, def);

            // Glow ring
            const ringGeo = new THREE.RingGeometry(4.5, 5, 32);
            const ringMat = new THREE.MeshBasicMaterial({
                color: def.color,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = 0.05;
            ring.name = 'glowRing';
            group.add(ring);

            scene.add(group);
            buildings3D.push(group);

            // Create initial building state
            updateBuildingAppearance(index, 0);
        });
    }

    function createScaffolding(group, color) {
        const scaffMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.8 });
        const positions = [
            [-3, 0, -3], [3, 0, -3], [3, 0, 3], [-3, 0, 3]
        ];

        positions.forEach(([x, y, z]) => {
            const pole = new THREE.Mesh(
                new THREE.CylinderGeometry(0.1, 0.1, 8, 6),
                scaffMat
            );
            pole.position.set(x, 4, z);
            pole.castShadow = true;
            group.add(pole);
        });

        // Cross bars
        for (let h = 2; h <= 6; h += 2) {
            [
                [[-3, h, -3], [3, h, -3]],
                [[3, h, -3], [3, h, 3]],
                [[3, h, 3], [-3, h, 3]],
                [[-3, h, 3], [-3, h, -3]],
            ].forEach(([from, to]) => {
                const bar = createBar(from, to, 0.06, scaffMat);
                group.add(bar);
            });
        }
    }

    function createBar(from, to, radius, material) {
        const [x1, y1, z1] = from;
        const [x2, y2, z2] = to;
        const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const geo = new THREE.CylinderGeometry(radius, radius, length, 6);
        const bar = new THREE.Mesh(geo, material);
        bar.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
        bar.lookAt(x2, y2, z2);
        bar.rotateX(Math.PI / 2);
        return bar;
    }

    function createBuildingSign(group, def) {
        const signGroup = new THREE.Group();

        const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 6);
        const postMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.y = 0.75;
        signGroup.add(post);

        const boardGeo = new THREE.BoxGeometry(3.5, 0.8, 0.1);
        const boardMat = new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.5 });
        const board = new THREE.Mesh(boardGeo, boardMat);
        board.position.y = 1.6;
        board.castShadow = true;
        signGroup.add(board);

        signGroup.position.set(0, 0, 5);
        signGroup.lookAt(0, signGroup.position.y, 0);
        group.add(signGroup);
    }

    function updateBuildingAppearance(index, progress) {
        const group = buildings3D[index];
        const def = BUILDING_DEFS[index];
        const structure = group.getObjectByName('structure');

        // Remove old structure children
        while (structure.children.length > 0) {
            structure.remove(structure.children[0]);
        }

        const mat = new THREE.MeshStandardMaterial({
            color: def.color,
            roughness: 0.5,
            metalness: 0.1,
        });
        const matLight = new THREE.MeshStandardMaterial({
            color: def.color,
            roughness: 0.4,
            metalness: 0.1,
            transparent: true,
            opacity: 0.9,
        });

        // Build different structures based on building type and progress
        if (index === 0) buildWorkshop(structure, mat, matLight, progress);
        else if (index === 1) buildBridge(structure, mat, matLight, progress);
        else if (index === 2) buildTower(structure, mat, matLight, progress);
        else if (index === 3) buildHouse(structure, mat, matLight, progress);
        else if (index === 4) buildGarden(structure, mat, matLight, progress);

        // Update glow ring
        const ring = group.getObjectByName('glowRing');
        if (ring) {
            ring.material.opacity = progress >= 3 ? 0.6 : 0.3;
        }
    }

    function buildWorkshop(parent, mat, matLight, progress) {
        // Gefühls-Werkstatt: circular/dome building
        if (progress >= 1) {
            // Foundation
            const base = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.8, 1.5, 8), mat);
            base.position.y = 1.15;
            base.castShadow = true;
            parent.add(base);
        }
        if (progress >= 2) {
            // Walls
            const walls = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 2.5, 8), matLight);
            walls.position.y = 3.15;
            walls.castShadow = true;
            parent.add(walls);
            // Windows
            const winMat = new THREE.MeshStandardMaterial({ color: 0xffe066, emissive: 0xffe066, emissiveIntensity: 0.3 });
            for (let i = 0; i < 4; i++) {
                const win = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.1), winMat);
                const a = (i / 4) * Math.PI * 2;
                win.position.set(Math.cos(a) * 2.4, 3, Math.sin(a) * 2.4);
                win.lookAt(0, 3, 0);
                parent.add(win);
            }
        }
        if (progress >= 3) {
            // Dome roof
            const dome = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat);
            dome.position.y = 4.4;
            dome.castShadow = true;
            parent.add(dome);
            // Heart on top
            const heart = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0xff4444, emissiveIntensity: 0.5 }));
            heart.position.y = 6.8;
            parent.add(heart);
        }
    }

    function buildBridge(parent, mat, matLight, progress) {
        // Brücke der Freundschaft: bridge structure
        if (progress >= 1) {
            // Pillars
            [-2.5, 2.5].forEach((x) => {
                const pillar = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1.5), mat);
                pillar.position.set(x, 1.9, 0);
                pillar.castShadow = true;
                parent.add(pillar);
            });
        }
        if (progress >= 2) {
            // Bridge deck
            const deck = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 2), matLight);
            deck.position.y = 3.6;
            deck.castShadow = true;
            parent.add(deck);
            // Railings
            [-0.9, 0.9].forEach((z) => {
                const rail = new THREE.Mesh(new THREE.BoxGeometry(7, 0.6, 0.1), mat);
                rail.position.set(0, 4.1, z);
                parent.add(rail);
            });
        }
        if (progress >= 3) {
            // Arch
            const archGeo = new THREE.TorusGeometry(2, 0.2, 8, 16, Math.PI);
            const arch = new THREE.Mesh(archGeo, mat);
            arch.position.set(0, 3.8, 0);
            arch.rotation.z = 0;
            arch.castShadow = true;
            parent.add(arch);
            // Flag on top
            const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2, 6), new THREE.MeshStandardMaterial({ color: 0x888888 }));
            flagPole.position.set(0, 6.8, 0);
            parent.add(flagPole);
            const flag = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.6), new THREE.MeshStandardMaterial({ color: 0x3b82f6, side: THREE.DoubleSide }));
            flag.position.set(0.5, 7.5, 0);
            parent.add(flag);
        }
    }

    function buildTower(parent, mat, matLight, progress) {
        // Turm der Stärke: tall tower
        if (progress >= 1) {
            const base = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 3), mat);
            base.position.y = 1.65;
            base.castShadow = true;
            parent.add(base);
        }
        if (progress >= 2) {
            const mid = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 2.5), matLight);
            mid.position.y = 4.15;
            mid.castShadow = true;
            parent.add(mid);
            // Windows
            const winMat = new THREE.MeshStandardMaterial({ color: 0xffe066, emissive: 0xffe066, emissiveIntensity: 0.3 });
            [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((a) => {
                const win = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.1), winMat);
                win.position.set(Math.cos(a) * 1.3, 4, Math.sin(a) * 1.3);
                win.lookAt(0, 4, 0);
                parent.add(win);
            });
        }
        if (progress >= 3) {
            const top = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), mat);
            top.position.y = 6.4;
            top.castShadow = true;
            parent.add(top);
            // Pyramid roof
            const roof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2, 4), new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4 }));
            roof.position.y = 8.4;
            roof.rotation.y = Math.PI / 4;
            roof.castShadow = true;
            parent.add(roof);
            // Star on top
            const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.4), new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.5 }));
            star.position.y = 9.8;
            parent.add(star);
        }
    }

    function buildHouse(parent, mat, matLight, progress) {
        // Haus der Worte: classic house
        if (progress >= 1) {
            const base = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 3.5), mat);
            base.position.y = 1.4;
            base.castShadow = true;
            parent.add(base);
        }
        if (progress >= 2) {
            const upper = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 3.5), matLight);
            upper.position.y = 3.15;
            upper.castShadow = true;
            parent.add(upper);
            // Door
            const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x8b4513 }));
            door.position.set(0, 1.1, 1.8);
            parent.add(door);
            // Windows
            const winMat = new THREE.MeshStandardMaterial({ color: 0xffe066, emissive: 0xffe066, emissiveIntensity: 0.3 });
            [[-1.2, 2.8, 1.8], [1.2, 2.8, 1.8]].forEach(([x, y, z]) => {
                const win = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.1), winMat);
                win.position.set(x, y, z);
                parent.add(win);
            });
        }
        if (progress >= 3) {
            // Roof
            const roofGeo = new THREE.ConeGeometry(3.2, 2, 4);
            const roof = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.5 }));
            roof.position.y = 5;
            roof.rotation.y = Math.PI / 4;
            roof.castShadow = true;
            parent.add(roof);
            // Speech bubble
            const bubble = new THREE.Mesh(
                new THREE.SphereGeometry(0.6, 8, 8),
                new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.2 })
            );
            bubble.position.set(2.5, 5.5, 0);
            bubble.scale.set(1.2, 0.8, 0.5);
            parent.add(bubble);
        }
    }

    function buildGarden(parent, mat, matLight, progress) {
        // Garten der Ruhe: garden/greenhouse
        if (progress >= 1) {
            // Garden beds
            const bedMat = new THREE.MeshStandardMaterial({ color: 0x5a3825, roughness: 1 });
            for (let i = -1; i <= 1; i += 2) {
                const bed = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 1.2), bedMat);
                bed.position.set(0, 0.6, i * 1.5);
                bed.castShadow = true;
                parent.add(bed);
            }
            // Small plants
            const plantMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
            for (let i = 0; i < 6; i++) {
                const plant = new THREE.Mesh(new THREE.SphereGeometry(0.3, 6, 6), plantMat);
                plant.position.set(-1.5 + i * 0.6, 1, (i % 2 === 0 ? 1 : -1) * 1.5);
                parent.add(plant);
            }
        }
        if (progress >= 2) {
            // Greenhouse frame
            const frameMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3 });
            // Arches
            for (let x = -1.5; x <= 1.5; x += 1.5) {
                const arch = new THREE.Mesh(new THREE.TorusGeometry(2, 0.08, 6, 12, Math.PI), frameMat);
                arch.position.set(x, 0.4, 0);
                arch.rotation.y = Math.PI / 2;
                parent.add(arch);
            }
            // Glass panels (transparent)
            const glassMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
            const glass = new THREE.Mesh(new THREE.SphereGeometry(2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), glassMat);
            glass.position.y = 0.4;
            glass.scale.set(1.5, 1, 1);
            parent.add(glass);
            // Trees
            const treeMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
            [-2, 2].forEach((x) => {
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.5, 6), new THREE.MeshStandardMaterial({ color: 0x8b4513 }));
                trunk.position.set(x, 1.15, 0);
                parent.add(trunk);
                const leaves = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 6), treeMat);
                leaves.position.set(x, 2.2, 0);
                parent.add(leaves);
            });
        }
        if (progress >= 3) {
            // Fountain in center
            const fountainMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4 });
            const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 0.6, 12), fountainMat);
            base.position.y = 0.7;
            parent.add(base);
            const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.3, 1, 12), fountainMat);
            basin.position.y = 1.5;
            parent.add(basin);
            // Water
            const water = new THREE.Mesh(
                new THREE.CylinderGeometry(0.55, 0.55, 0.1, 12),
                new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.2, transparent: true, opacity: 0.8 })
            );
            water.position.y = 2;
            parent.add(water);
            // Flowers
            const flowerColors = [0xff6b6b, 0xfbbf24, 0xa78bfa, 0xf472b6, 0x34d399];
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2;
                const r = 2.5 + Math.random() * 0.5;
                const flower = new THREE.Mesh(
                    new THREE.SphereGeometry(0.2, 6, 6),
                    new THREE.MeshStandardMaterial({ color: flowerColors[i % flowerColors.length], emissive: flowerColors[i % flowerColors.length], emissiveIntensity: 0.2 })
                );
                flower.position.set(Math.cos(angle) * r, 0.6, Math.sin(angle) * r);
                parent.add(flower);
            }
            // Butterfly (simple)
            const butterfly = new THREE.Group();
            const wingMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
            [-1, 1].forEach((side) => {
                const wing = new THREE.Mesh(new THREE.CircleGeometry(0.25, 6), wingMat);
                wing.position.x = side * 0.2;
                wing.rotation.y = side * 0.5;
                butterfly.add(wing);
            });
            butterfly.position.set(1, 3.5, 1);
            butterfly.name = 'butterfly';
            parent.add(butterfly);
        }
    }

    // ---- Decorations ----
    function createDecorations() {
        // Trees around the edge
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const r = CONFIG.BUILDING_RADIUS + 12 + Math.random() * 15;
            const tree = createTree();
            tree.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
            tree.rotation.y = Math.random() * Math.PI * 2;
            scene.add(tree);
        }

        // Cones / barriers
        for (let i = 0; i < 8; i++) {
            const angle = ((i + 0.5) / 5) * Math.PI * 2;
            const r = CONFIG.BUILDING_RADIUS - 3;
            const cone = createTrafficCone();
            cone.position.set(
                Math.cos(angle) * r + (Math.random() - 0.5) * 4,
                0,
                Math.sin(angle) * r + (Math.random() - 0.5) * 4
            );
            scene.add(cone);
        }

        // Cranes (simple)
        for (let i = 0; i < 2; i++) {
            const crane = createCrane();
            const angle = Math.PI / 3 + i * Math.PI;
            crane.position.set(
                Math.cos(angle) * (CONFIG.BUILDING_RADIUS + 5),
                0,
                Math.sin(angle) * (CONFIG.BUILDING_RADIUS + 5)
            );
            crane.rotation.y = angle + Math.PI;
            scene.add(crane);
        }

        // Material piles
        for (let i = 0; i < 5; i++) {
            const pile = createMaterialPile();
            const angle = Math.random() * Math.PI * 2;
            const r = 8 + Math.random() * 10;
            pile.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
            scene.add(pile);
        }
    }

    function createTree() {
        const group = new THREE.Group();
        const trunkH = 2 + Math.random() * 2;
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.3, trunkH, 6),
            new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9 })
        );
        trunk.position.y = trunkH / 2;
        trunk.castShadow = true;
        group.add(trunk);

        const leavesSize = 1.2 + Math.random() * 1;
        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(leavesSize, 8, 6),
            new THREE.MeshStandardMaterial({ color: 0x228B22 + Math.floor(Math.random() * 0x003300), roughness: 0.8 })
        );
        leaves.position.y = trunkH + leavesSize * 0.5;
        leaves.castShadow = true;
        group.add(leaves);

        return group;
    }

    function createTrafficCone() {
        const group = new THREE.Group();
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.25, 0.8, 8),
            new THREE.MeshStandardMaterial({ color: 0xff6600 })
        );
        cone.position.y = 0.4;
        cone.castShadow = true;
        group.add(cone);

        const stripe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.2, 0.12, 8),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        stripe.position.y = 0.45;
        group.add(stripe);

        return group;
    }

    function createCrane() {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 });
        const matDark = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });

        // Base
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.5), matDark);
        base.position.y = 0.25;
        group.add(base);

        // Tower
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.4, 14, 0.4), mat);
        tower.position.y = 7;
        tower.castShadow = true;
        group.add(tower);

        // Arm
        const arm = new THREE.Mesh(new THREE.BoxGeometry(10, 0.3, 0.3), mat);
        arm.position.set(3, 13.5, 0);
        arm.castShadow = true;
        group.add(arm);

        // Counter-weight
        const cw = new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 0.8), matDark);
        cw.position.set(-2.5, 13.5, 0);
        group.add(cw);

        // Cable
        const cable = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 5, 4),
            new THREE.MeshStandardMaterial({ color: 0x333333 })
        );
        cable.position.set(7, 11, 0);
        group.add(cable);

        // Hook block
        const hook = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), matDark);
        hook.position.set(7, 8.5, 0);
        group.add(hook);

        return group;
    }

    function createMaterialPile() {
        const group = new THREE.Group();
        const colors = [0xcc8844, 0xbb7733, 0xaa6622];
        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(0.6 + Math.random() * 0.3, 0.3, 0.6 + Math.random() * 0.3),
                new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.9 })
            );
            box.position.set((Math.random() - 0.5) * 0.8, 0.15 + i * 0.3, (Math.random() - 0.5) * 0.8);
            box.rotation.y = Math.random() * 0.3;
            box.castShadow = true;
            group.add(box);
        }
        return group;
    }

    // ---- Particles ----
    function createParticles() {
        const count = 50;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = 1 + Math.random() * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
            color: 0xffd700,
            size: 0.15,
            transparent: true,
            opacity: 0.6,
        });
        const points = new THREE.Points(geo, mat);
        points.name = 'dustParticles';
        scene.add(points);
    }

    // ---- Player ----
    function createPlayer() {
        player = new THREE.Group();
        player.name = 'player';

        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.7 });
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xfdbcb4, roughness: 0.8 });
        const hatMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
        const bootMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });

        // Legs
        [-0.25, 0.25].forEach((x) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.9, 6), bodyMat);
            leg.position.set(x, 0.45, 0);
            leg.castShadow = true;
            player.add(leg);

            const boot = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.2, 0.35), bootMat);
            boot.position.set(x, 0.1, 0.05);
            boot.castShadow = true;
            player.add(boot);
        });

        // Body
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.45), bodyMat);
        body.position.y = 1.35;
        body.castShadow = true;
        player.add(body);

        // Vest
        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.5, 0.47), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
        vest.position.y = 1.5;
        player.add(vest);

        // Arms
        [-0.5, 0.5].forEach((x) => {
            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 6), bodyMat);
            arm.position.set(x, 1.2, 0);
            arm.castShadow = true;
            player.add(arm);

            const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), skinMat);
            hand.position.set(x, 0.82, 0);
            player.add(hand);
        });

        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), skinMat);
        head.position.y = 2.1;
        head.castShadow = true;
        player.add(head);

        // Hard hat
        const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.06, 12), hatMat);
        hatBrim.position.y = 2.3;
        hatBrim.castShadow = true;
        player.add(hatBrim);

        const hatTop = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), hatMat);
        hatTop.position.y = 2.32;
        hatTop.castShadow = true;
        player.add(hatTop);

        // Eyes
        const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
        [-0.1, 0.1].forEach((x) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
            eye.position.set(x, 2.15, 0.27);
            player.add(eye);
        });

        // Smile
        const smile = new THREE.Mesh(
            new THREE.TorusGeometry(0.08, 0.02, 4, 8, Math.PI),
            eyeMat
        );
        smile.position.set(0, 2.02, 0.27);
        smile.rotation.x = Math.PI;
        player.add(smile);

        player.position.set(0, 0, 0);
        player.castShadow = true;
        scene.add(player);
    }

    // ---- Input ----
    function setupInput(canvas) {
        document.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
            if (e.key === 'Shift') isRunning = true;
            if (e.key.toLowerCase() === 'e' && nearBuilding !== null) {
                if (onInteract) onInteract(nearBuilding);
            }
        });
        document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
            if (e.key === 'Shift') isRunning = false;
        });

        // Mouse camera control
        canvas.addEventListener('mousedown', (e) => {
            mouseDown = true;
            prevMouseX = e.clientX;
        });
        document.addEventListener('mouseup', () => { mouseDown = false; });
        document.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                const dx = e.clientX - prevMouseX;
                cameraAngle -= dx * 0.005;
                prevMouseX = e.clientX;
            }
        });

        // Touch support
        let touchStartX = 0;
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
            }
        });
        canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const dx = e.touches[0].clientX - touchStartX;
                cameraAngle -= dx * 0.005;
                touchStartX = e.touches[0].clientX;
            }
        });

        // Double-tap/click to interact
        canvas.addEventListener('dblclick', () => {
            if (nearBuilding !== null && onInteract) {
                onInteract(nearBuilding);
            }
        });
    }

    // ---- Mobile controls ----
    function setupMobileControls() {
        // Create mobile control buttons
        const mobileDiv = document.createElement('div');
        mobileDiv.className = 'mobile-controls';
        mobileDiv.innerHTML = `
            <button class="mobile-btn mobile-btn-up" data-key="w">\u2191</button>
            <button class="mobile-btn mobile-btn-left" data-key="a">\u2190</button>
            <button class="mobile-btn mobile-btn-down" data-key="s">\u2193</button>
            <button class="mobile-btn mobile-btn-right" data-key="d">\u2192</button>
        `;
        document.getElementById('game-screen').appendChild(mobileDiv);

        // Add mobile interact button
        const interactBtn = document.createElement('button');
        interactBtn.className = 'mobile-btn';
        interactBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:20;width:70px;height:70px;font-size:1.8rem;display:none;background:rgba(245,158,11,0.5);border-color:var(--color-primary);';
        interactBtn.textContent = 'E';
        interactBtn.id = 'mobile-interact';
        document.getElementById('game-screen').appendChild(interactBtn);

        interactBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (nearBuilding !== null && onInteract) onInteract(nearBuilding);
        });

        mobileDiv.querySelectorAll('.mobile-btn').forEach((btn) => {
            const key = btn.dataset.key;
            if (!key) return;
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keys[key] = true;
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                keys[key] = false;
            });
            btn.addEventListener('touchcancel', () => { keys[key] = false; });
        });
    }

    // ---- Camera ----
    function updateCamera() {
        if (!player) return;
        const targetX = player.position.x - Math.sin(cameraAngle) * CONFIG.CAMERA_DISTANCE;
        const targetZ = player.position.z - Math.cos(cameraAngle) * CONFIG.CAMERA_DISTANCE;
        camera.position.lerp(
            new THREE.Vector3(targetX, CONFIG.CAMERA_HEIGHT, targetZ),
            0.08
        );
        camera.lookAt(
            player.position.x,
            player.position.y + 2,
            player.position.z
        );
    }

    // ---- Update ----
    function update() {
        const delta = clock.getDelta();
        const speed = isRunning ? CONFIG.PLAYER_RUN_SPEED : CONFIG.PLAYER_SPEED;

        // Player movement
        let moveX = 0, moveZ = 0;
        if (keys['w'] || keys['arrowup']) moveZ = 1;
        if (keys['s'] || keys['arrowdown']) moveZ = -1;
        if (keys['a'] || keys['arrowleft']) moveX = 1;
        if (keys['d'] || keys['arrowright']) moveX = -1;

        if (moveX !== 0 || moveZ !== 0) {
            const angle = cameraAngle;
            const forward = new THREE.Vector3(
                -Math.sin(angle) * moveZ + -Math.cos(angle) * moveX,
                0,
                -Math.cos(angle) * moveZ + Math.sin(angle) * moveX
            );
            forward.normalize().multiplyScalar(speed);

            const newX = player.position.x + forward.x;
            const newZ = player.position.z + forward.z;

            // World bounds
            const dist = Math.sqrt(newX * newX + newZ * newZ);
            if (dist < CONFIG.WORLD_SIZE - 2) {
                player.position.x = newX;
                player.position.z = newZ;
            }

            // Rotate player to face movement direction
            playerAngle = Math.atan2(forward.x, forward.z);
            player.rotation.y = playerAngle;

            // Walking animation (simple bob)
            player.position.y = Math.abs(Math.sin(Date.now() * 0.008)) * 0.15;
        } else {
            player.position.y = THREE.MathUtils.lerp(player.position.y, 0, 0.1);
        }

        // Check proximity to buildings
        let closest = null;
        let closestDist = CONFIG.INTERACTION_DISTANCE;

        buildings3D.forEach((b, i) => {
            const dx = player.position.x - b.position.x;
            const dz = player.position.z - b.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }

            // Animate glow rings
            const ring = b.getObjectByName('glowRing');
            if (ring) {
                ring.rotation.z += 0.003;
                const pulse = 0.3 + Math.sin(Date.now() * 0.002 + i) * 0.1;
                ring.material.opacity = i === closest ? 0.7 : pulse;
            }
        });

        nearBuilding = closest;

        // Show/hide interaction prompt
        const prompt = document.getElementById('interaction-prompt');
        const mobileInteract = document.getElementById('mobile-interact');
        if (closest !== null) {
            prompt.classList.remove('hidden');
            document.getElementById('prompt-text').textContent = BUILDING_DEFS[closest].name + ' betreten';
            if (mobileInteract) mobileInteract.style.display = 'flex';
        } else {
            prompt.classList.add('hidden');
            if (mobileInteract) mobileInteract.style.display = 'none';
        }

        // Animate particles
        const dustPoints = scene.getObjectByName('dustParticles');
        if (dustPoints) {
            const pos = dustPoints.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.array[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.005;
                if (pos.array[i * 3 + 1] > 16) pos.array[i * 3 + 1] = 1;
            }
            pos.needsUpdate = true;
        }

        // Animate clouds
        decorations.forEach((obj) => {
            if (obj.userData.speed) {
                obj.position.x += obj.userData.speed;
                if (obj.position.x > 70) obj.position.x = -70;
            }
        });

        // Animate butterflies
        buildings3D.forEach((b) => {
            const butterfly = b.getObjectByName('butterfly');
            if (butterfly) {
                butterfly.position.y = 3.5 + Math.sin(Date.now() * 0.002) * 0.5;
                butterfly.position.x = 1 + Math.sin(Date.now() * 0.001) * 1.5;
                butterfly.rotation.y = Date.now() * 0.003;
            }
        });

        updateCamera();
    }

    // ---- Animate ----
    function animate() {
        animationId = requestAnimationFrame(animate);
        update();
        renderer.render(scene, camera);
    }

    // ---- Resize ----
    function onResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // ---- Public API ----
    return {
        CONFIG: CONFIG,
        BUILDING_DEFS: BUILDING_DEFS,

        init: function (canvas, interactCallback) {
            init(canvas, interactCallback);
            setupMobileControls();
        },

        updateBuildingProgress: function (index, progress) {
            if (index >= 0 && index < buildings3D.length) {
                buildings3D[index].userData.progress = progress;
                updateBuildingAppearance(index, progress);
            }
        },

        getBuildingDefs: function () {
            return BUILDING_DEFS;
        },

        pause: function () {
            if (animationId) cancelAnimationFrame(animationId);
            animationId = null;
        },

        resume: function () {
            if (!animationId) {
                clock.getDelta(); // reset delta
                animate();
            }
        },

        spawnCelebrationParticles: function (buildingIndex) {
            const building = buildings3D[buildingIndex];
            if (!building) return;

            const colors = [0xf59e0b, 0x10b981, 0x3b82f6, 0x8b5cf6, 0xef4444, 0xfbbf24];
            for (let i = 0; i < 30; i++) {
                const geo = new THREE.SphereGeometry(0.1 + Math.random() * 0.1, 4, 4);
                const mat = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
                const particle = new THREE.Mesh(geo, mat);
                particle.position.copy(building.position);
                particle.position.y = 4 + Math.random() * 2;
                particle.userData.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.3,
                    0.1 + Math.random() * 0.2,
                    (Math.random() - 0.5) * 0.3
                );
                particle.userData.life = 1;
                scene.add(particle);

                // Animate and remove
                const animateParticle = () => {
                    particle.position.add(particle.userData.velocity);
                    particle.userData.velocity.y -= 0.005;
                    particle.userData.life -= 0.015;
                    particle.material.opacity = particle.userData.life;
                    particle.material.transparent = true;
                    if (particle.userData.life > 0) {
                        requestAnimationFrame(animateParticle);
                    } else {
                        scene.remove(particle);
                    }
                };
                requestAnimationFrame(animateParticle);
            }
        },

        destroy: function () {
            if (animationId) cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
            if (renderer) renderer.dispose();
        },
    };
})();
