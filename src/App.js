import PageIniciarSesion from './components/organisms/IniciarSesion/PageIniciarSesion';
import { PageCreateForm } from './PageCreateForm';
import { PageRevision } from './components/organisms/Direccion/PageRevision';
import { PageMyForm } from './PageMyForm';
import { PagePerfil } from './components/organisms/Alumno/PagePerfil';
import { PageDireccion } from './components/organisms/Direccion/PageDireccion';
import { PageVerEquivalencia } from './components/organisms/Alumno/PageVerEquivalencia';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageRegistro from './components/organisms/Registro/PageRegistro';
import SignUpForm from './components/organisms/Registro/PageRegistro';

function App() {
    const rol = JSON.parse(localStorage.getItem('rol'));
    return (
        <>
            {rol == 'alumno' && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                    <Route
                        path="/usuario/equivalencias"
                        component={PageMyForm}
                    />
                    <Route
                        path="/usuario/visualizar/:id"
                        component={PageVerEquivalencia}
                    />
                    <Route
                        path="/usuario/formulario"
                        component={PageCreateForm}
                    />
                </Router>
            )}
            {rol == 'directivo' && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                    <Route
                        path="/direccion/solicitudes"
                        component={PageDireccion}
                    />
                    <Route
                        path="/direccion/revision/:id"
                        component={PageRevision}
                    />
                </Router>
            )}
            {rol == null && (
                <Router>
                    <Route path="/" exact component={PageIniciarSesion} />
                    <Route path="/registro" exact component={SignUpForm} />
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
