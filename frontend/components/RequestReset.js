import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../hooks/useForm';
import ErrorMessage from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    const res = await signup().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  };
  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}

        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
