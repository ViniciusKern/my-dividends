import { Link } from "react-router-dom";
import styled from "styled-components";

import addIcon from "../../assets/icons/add.png";

const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  title: string;
  link?: { to: string; label: string };
};

export default function SubHeader({ title, link }: Props) {
  return (
    <Container>
      <h2>{title}</h2>
      {link && (
        <Link to={link.to} className="link">
          <span>
            <img src={addIcon} /> {link.label}
          </span>
        </Link>
      )}
    </Container>
  );
}
