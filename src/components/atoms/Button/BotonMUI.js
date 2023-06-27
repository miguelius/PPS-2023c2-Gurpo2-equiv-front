import { Button, styled } from '@mui/material';
import { css } from '@mui/styled-engine';

const BotonMUI = styled(Button)`
    width: 200px;
    height: 45px;
    text-transform: none;
    border: none;
    color: #fff;

    &:hover {
        border: none;
        background-color: rgba(255, 255, 255, 0.1);
    }

    ${(props) =>
        props.buttoncontained &&
        css`
            width: 170px;
            height: 45px;
            background-color: #009673;

            &:hover {
                background-color: #007a5e;
            }
        `}

    ${(props) =>
        props.buttonoutlined &&
        css`
            width: 170px;
            height: 45px;
            border: 1px solid #fff;
            color: #fff;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid #fff;
            }
        `}

    ${(props) =>
        props.buttoncontainedheader &&
        css`
            width: 170px;
            height: 45px;
            background-color: rgba(26, 64, 76, 0.6);

            &:hover {
                background-color: rgba(26, 64, 76, 0.6);
            }
        `}

    ${(props) =>
        props.buttonlogout &&
        css`
            background-color: rgba(239, 83, 80, 0.9);

            &:hover {
                background-color: rgba(236, 53, 50, 0.9);
            }
        `}

    ${(props) =>
        props.buttonupload &&
        css`
            background-color: #f37d63;
            width: 80px;
            height: 30px;

            &:hover {
                background-color: #f27154;
            }
        `}

    ${(props) =>
        props.buttondownload &&
        css`
            background-color: #fffff;
            border: 1px solid #0941ce;
            color: #0941ce;
            width: 90px;
            height: 30px;

            &:hover {
                border: 1px solid #0941ce;
                opacity: 0.7;
            }
        `}   

        ${(props) =>
        props.buttoncontainedaddmateria &&
        css`
            width: 150px;
            height: 40px;
            color: #009673;

            &:hover {
                background-color: rgba(0, 150, 115, 0.05);
            }
        `}

        ${(props) =>
        props.buttoncontainedaddeq &&
        css`
            width: 180px;
            height: 40px;
            color: #009673;
            border: 1px solid rgba(0, 150, 115, 0.4);

            &:hover {
                background-color: rgba(0, 150, 115, 0.05);
                border: 1px solid rgba(0, 150, 115, 1);
            }
        `}

        ${(props) =>
        props.buttoncontainedcancel &&
        css`
            width: 110px;
            height: 40px;
            color: #fffff;
            background-color: #ef2626;

            &:hover {
                background-color: #c20008;
            }
        `}

        ${(props) =>
        props.buttoncontainedsmall &&
        css`
            width: 110px;
            height: 40px;
            background-color: #009673;

            &:hover {
                background-color: #007a5e;
            }
        `}
        ${(props) =>
        props.buttoncontainedsmallfinalizar &&
        css`
            width: 110px;
            height: 40px;
            background-color: #2a74e4;
            color: '#FFFFFF';

            &:hover {
                background-color: #2463c2;
            }
        `}
`;

export { BotonMUI };
