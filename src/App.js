import PageIniciarSesion from './components/organisms/IniciarSesion/PageIniciarSesion';
import { PageRevision } from './components/organisms/Direccion/PageRevision';
import { PageEquivalencias } from './components/organisms/PageEquivalencias';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PageCreateForm } from './components/molecules/PageCreateForm';

function App() {
    const rol = JSON.parse(localStorage.getItem('rol'));
    return (
        <>
            {rol == 'alumno' && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                    <Route path="/usuario/equivalencias">
                        <PageEquivalencias rol={rol}></PageEquivalencias>
                    </Route>
                    <Route path="/usuario/visualizar/:id">
                        <PageRevision rol={rol} />
                    </Route>
                    <Route
                        path="/usuario/formulario"
                        component={PageCreateForm}
                    />
                </Router>
            )}
            {rol == 'directivo' && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                    <Route path="/direccion/solicitudes">
                        <PageEquivalencias rol={rol}></PageEquivalencias>
                    </Route>

                    <Route path="/direccion/revision/:id">
                        <PageRevision rol={rol} />
                    </Route>
                </Router>
            )}
            {rol == null && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                </Router>
            )}

            <ToastContainer
                containerId={'Toastify'}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
