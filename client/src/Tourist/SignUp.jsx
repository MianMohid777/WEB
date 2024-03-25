import { useLoginQuery } from "../services/loginAPI/loginAPI";

const SignUp = () => {
  const { data, isSuccess, isError, isLoading, isFetching } = useLoginQuery({
    username: "mohid",
    password: "<PASSWORD>",
  });
  return <></>;
};

export default SignUp;
