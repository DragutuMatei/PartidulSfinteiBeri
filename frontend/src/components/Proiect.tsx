import React from "react";
import { useGetUserByIdQuery } from "../generated/graphql";
import  NextLink  from 'next/link';
interface ProiectProps {
  pr: {
    id: number;
    userId: string;
    numeleProiectului: string;
    sefId: number;
  };
}

export const Proiect: React.FC<ProiectProps> = (props) => {
    const [plm] = useGetUserByIdQuery({ variables: { id: props.pr.sefId } });
    
  return (
    <div className="project">
      <div className="description">
        <p>{props.pr.numeleProiectului}</p>
      </div>
      <div className="membri-lider">
        <div className="membrii">
          <h4>Membrii:</h4>
          <ul>
            {props.pr.userId.split(",").map((id) => {
              let idDarNr = parseInt(id);
              const [{ data }] = useGetUserByIdQuery({
                variables: {
                  id: idDarNr,
                },
              });
              return <li>{data?.getUserById.email}</li>;
            })}
          </ul>
        </div>
        <hr />
        <div className="lider">
          <h4>Lider:</h4>
          <ul>{plm.data?.getUserById.email}</ul>
        </div>
      </div>
      <NextLink href="project">Vezi proiect</NextLink>
    </div>
  );
};
