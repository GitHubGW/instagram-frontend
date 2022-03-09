import styled from "styled-components";
import { useForm } from "react-hook-form";
import { VscSmiley } from "react-icons/vsc";

interface FormData {
  text: string;
}

const Form = styled.form`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px;
  display: flex;
  margin-top: 15px;
`;

const Emoji = styled.div`
  margin-right: 10px;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding-left: 10px;
  margin-right: auto;
  font-size: 14px;
  width: 86%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgContainerColor};
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.grayTextColor};
  }
`;

const Button = styled.button`
  color: ${(props) => (props.disabled === true ? props.theme.inactiveColor : props.theme.activeColor)};
  font-size: 14px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });

  const onValid = () => {
    const { text } = getValues();
    console.log("text", text);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Emoji>
        <VscSmiley />
      </Emoji>
      <Input {...register("text", { required: "댓글을 입력해주세요.", minLength: 1, maxLength: 70 })} type="text" minLength={1} maxLength={70} placeholder="댓글 달기..." />
      <Button type="submit" disabled={!isValid}>
        게시
      </Button>
    </Form>
  );
};

export default CommentForm;
