import Name from "../../shared/Name";
import Avatar from "../../shared/Avatar";
import Username from "../../shared/Username";
import { Link } from "react-router-dom";

interface SearchUserProps {
  username?: string | null;
  avatarUrl?: string | null;
  name?: string | null;
}

const SearchUser = ({ username, avatarUrl, name }: SearchUserProps) => {
  return (
    <Link to={`/users/${username}`}>
      <Avatar size="47px" avatarUrl={avatarUrl || "/images/basic_user.jpeg"} />
      <div>
        <Username size="15px" username={username} textDecoration={"false"} />
        <Name size="14px" name={name} />
      </div>
    </Link>
  );
};

export default SearchUser;
