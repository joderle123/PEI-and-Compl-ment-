import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Inner Worlds Error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#faf3e8',
          padding: '2rem',
          fontFamily: 'Nunito, sans-serif',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            maxWidth: '28rem',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😟</div>
            <h2 style={{ color: '#6C5CE7', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Ups, etwas ist schiefgelaufen!
            </h2>
            <p style={{ color: '#636e72', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Keine Sorge, das passiert manchmal. Klicke auf den Button, um das Spiel neu zu starten.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: '#6C5CE7',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '1rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Spiel neu starten
            </button>
            {this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary style={{ color: '#b2bec3', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Technische Details
                </summary>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.65rem',
                  overflow: 'auto',
                  marginTop: '0.5rem',
                  color: '#d63031',
                }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
