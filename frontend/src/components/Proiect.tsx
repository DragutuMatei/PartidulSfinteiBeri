import React from "react";
import {
  useDeleteProiectMutation,
  useGetUserByIdQuery,
} from "../generated/graphql";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
  const [, deleteProiet] = useDeleteProiectMutation();

  return (
    <div className="project">
      <h1
        style={{ cursor: "pointer" }}
        onClick={async () => {
          const rez = await deleteProiet({ id: props.pr.id });
          if (!rez.error) {
            alert("Project deleted");
          }
        }}
      >
        <FontAwesomeIcon icon={faTimesCircle} style={{ padding: "5px" }} />
      </h1>
      <div className="description">
        <p>{props.pr.numeleProiectului}</p>
      </div>
      <div className="membri-lider">
        <div className="membrii">
          <h4>Membrii:</h4>
          <ul>
            {props.pr.userId.split(",").map((id) => {
              let idDarNr = parseInt(id);
              if (idDarNr) {
                const [{ data }] = useGetUserByIdQuery({
                  variables: {
                    id: idDarNr,
                  },
                });
                return <li>{data?.getUserByIdQ.email}</li>;
              }
              return null;
            })}
          </ul>
        </div>
        <hr />
        <div className="lider">
          <h4>Lider:</h4>
          <ul>{plm.data?.getUserByIdQ.email}</ul>
        </div>
      </div>
      <NextLink href={`proiect/${props.pr.id}`}>Vezi proiect</NextLink>
    </div>
  );
};
