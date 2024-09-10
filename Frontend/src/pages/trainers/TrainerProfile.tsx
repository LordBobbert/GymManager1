import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, CircularProgress, Typography, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchTrainerProfile, updateTrainer } from '../../api/userApi';

interface Trainer {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    status: string;
}

const TrainerProfile: React.FC = () => {
    const { trainerId } = useParams<{ trainerId: string }>(); // Extract trainerId from URL params
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTrainer = async () => {
            const data = await fetchTrainerProfile(Number(trainerId));
            setTrainer(data);
            setLoading(false);
        };

        loadTrainer();
    }, [trainerId]);

    if (loading || !trainer) {
        return <CircularProgress />;
    }

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone_number: Yup.string().required('Phone number is required'),
        status: Yup.string().required('Status is required'),
    });

    const handleSubmit = async (values: Trainer) => {
        await updateTrainer(trainer.id, values);
        alert('Trainer updated successfully');
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Trainer Profile: {trainer.name}
            </Typography>

            <Formik
                initialValues={trainer}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Name"
                                    name="name"
                                    fullWidth
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Phone Number"
                                    name="phone_number"
                                    fullWidth
                                    error={touched.phone_number && Boolean(errors.phone_number)}
                                    helperText={touched.phone_number && errors.phone_number}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Status"
                                    name="status"
                                    fullWidth
                                    error={touched.status && Boolean(errors.status)}
                                    helperText={touched.status && errors.status}
                                />
                            </Grid>
                        </Grid>

                        <Box mt={4}>
                            <Button variant="contained" color="primary" type="submit">
                                Save Changes
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default TrainerProfile;
