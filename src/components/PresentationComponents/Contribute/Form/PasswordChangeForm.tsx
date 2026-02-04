import React from 'react';

import { Box, TextField, Button, Typography, Alert } from '@mui/material';

import {
  usePasswordChangeForm,
  PasswordChangeFormData,
} from '@/hooks/usePasswordChangeForm';

interface PasswordChangeFormProps {
  onSubmit?: (data: PasswordChangeFormData) => Promise<void> | void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onSubmit,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleSubmit,
  } = usePasswordChangeForm();

  return (
    <Box
      sx={{
        padding: '2rem',
        textAlign: 'left',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Set Password
      </Typography>
      {isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password has been successfully changed!
        </Alert>
      )}
      {errors.general && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.general}
        </Alert>
      )}
      <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <Box sx={{ mb: 3 }}>
          <TextField
            sx={{ width: 300 }}
            slotProps={{
              input: {
                sx: {
                  height: 42,
                  padding: '0 8px',
                },
              },
            }}
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            sx={{ width: 300 }}
            slotProps={{
              input: {
                sx: {
                  height: 42,
                  padding: '0 8px',
                },
              },
            }}
            label="Password (again)"
            variant="outlined"
            type="password"
            name="passwordAgain"
            value={formData.passwordAgain}
            onChange={handleInputChange}
            error={!!errors.passwordAgain}
            helperText={errors.passwordAgain}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{
            backgroundColor: 'rgb(55, 148, 141)',
            color: '#fff',
            height: 32,
            fontSize: '0.85rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(6, 186, 171, 0.83)',
            },
          }}
        >
          {isSubmitting ? 'Changing...' : 'Reset Password'}
        </Button>
      </form>
    </Box>
  );
};

export default PasswordChangeForm;
