'use client';

import styles from '@components/modals/ModalFeedback.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import { useModals } from '@components/page/ModalContext';

import Button from '@components/Button';
import CardDouble from '@components/CardDouble';
import TextArea from '@components/TextArea';
import Input from '@components/Input';
import RadioButtonGroup from '@components/RadioButtonGroup';
import BarProgress from '@components/BarProgress';

function ModalFeedback() {
  const { close } = useModals();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        close();
      }, 1500);
    }, 1500);
  };

  return (
    <div className={styles.root}>
      <CardDouble title="FEEDBACK">
        {submitted ? (
          <div className={styles.success}>
            Thank you for your feedback! Your input helps us improve.
          </div>
        ) : (
          <>
            <div className={styles.description}>
              Help us improve voet by sharing your thoughts and suggestions.
            </div>
            <br />
            <RadioButtonGroup
              defaultValue="feature"
              options={[
                { value: 'feature', label: 'Feature Request' },
                { value: 'bug', label: 'Bug Report' },
                { value: 'feedback', label: 'General Feedback' },
              ]}
            />
            <br />
            <Input 
              autoComplete="off" 
              label="SUBJECT" 
              placeholder="Brief description of your feedback"
              name="feedback_subject" 
            />
            <TextArea
              placeholder="Describe your feedback in detail..."
              style={{ minHeight: '120px' }}
            />
            <br />
            <Input 
              autoComplete="off" 
              label="EMAIL (OPTIONAL)" 
              placeholder="Your email for follow-up"
              name="feedback_email" 
              type="email"
            />
            <br />
            {isSubmitting ? (
              <BarProgress progress={50} />
            ) : (
              <Button onClick={handleSubmit}>Submit Feedback</Button>
            )}
          </>
        )}
      </CardDouble>
    </div>
  );
}

export default ModalFeedback; 