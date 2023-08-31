import { MateriaUniOrigen } from './MateriaUniOrigen';

const DatosMateriaUniOrigen = ({
    formValue,
    handleChangeArray,
    formValueArray,
    key2
}) => {
    return (
        <>
            <MateriaUniOrigen
                formValue={formValue}
                handleChangeArray={handleChangeArray}
                formValueArray={formValueArray}
                key2={key2}
            />
        </>
    );
};

export { DatosMateriaUniOrigen };
