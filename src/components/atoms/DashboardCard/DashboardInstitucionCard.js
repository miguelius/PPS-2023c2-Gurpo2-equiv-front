import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = ({ tituloCard, cuerpoCard, imgSrc, link }) => {
    return (
        <>
            <a href={link} style={{ textDecoration: 'none' }}>
                <Card
                    sx={{
                        maxWidth: 240,
                        alignItems: 'center',
                        ':hover': {
                            boxShadow: 20 // theme.shadows[20]
                        }
                    }}
                >
                    <CardContent sx={{ textAlign: 'center', paddingTop: '8%' }}>
                        <img src={imgSrc} alt="Logo" width="72" />
                        <Typography gutterBottom variant="h6" component="div">
                            {tituloCard}
                        </Typography>
                    </CardContent>
                    <CardContent
                        sx={{ alignItems: 'center', textAlign: 'center' }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ alignItems: 'center', paddingTop: '0.5%' }}
                        >
                            {cuerpoCard}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        </>
    );
};
export default DashboardCard;
