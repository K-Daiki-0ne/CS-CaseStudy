import { useState, ReactNode } from 'react';
import { NextPage } from 'next';
import { Box, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import { Layuot } from '../../components/Layout';
import { Header } from '../../components/Header/Header';
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { StudySetting } from '../../components/StudySetting/StudySetting';

const steps = ['ユーザー情報設定', '学習設定'];

const RegisterUser: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);
  const handleBack = () => setCurrentStep((prevActiveStep: number) => prevActiveStep - 1);
  const handleNext = () => setCurrentStep((prevActiveStep: number) => prevActiveStep + 1);

  return (
    <Layuot>
      <Header title='CaseStudy' page='register-user' />
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1, textAlign: 'center' }}>
          ユーザー情報登録
        </Typography>
        <Stepper 
          activeStep={currentStep} 
          sx={{ 
            mt: 5, 
            width: '70%', 
            ml: '15%' 
          }}
        >
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: ReactNode } = {};
            return (
              <Step key={label} {...stepProps} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        { currentStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>テスト</Typography>
          </>
        ) : (
          <>
            <Box sx={{ width: '100%', mt: 5 }}>
              { currentStep === 0 ? (
                <>
                  <UserInfo />
                </>
              ) : (
                <>
                  <StudySetting />
                </>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={currentStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Layuot>
  )
};

export default RegisterUser;