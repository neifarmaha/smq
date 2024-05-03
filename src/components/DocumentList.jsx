import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDocuments } from "../js/actions/documentActions";
import { getUser } from "../js/actions/userActions";

const DocumentList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const { documents } = useSelector((state) => state.documents);
  // const [permittedUsers, setPermittedUsers] = useState([]);
  

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("userId")));
    dispatch(getDocuments(params.department));
  }, [])
  


  // useEffect(() => {
  //   setPermittedUsers(
  //     documents
  //       .map((el) =>
  //         el.attributes?.users_permissions_users?.data.map(
  //           (el) => el.attributes.username
  //         )
  //       )
  //       .flatMap((el) => el)
  //   );
  // }, [documents, params.department]);


 
  

  return (
    <div className="flex-col" >
      <div className="text-3xl items-start font-bold">
          <h1 className="felx-start left-0" > {params.department} Documents  </h1>
      </div>
      <div>
        <ul>
          {documents?.filter(el=>el.attributes.users_permissions_users.data.find(el=>el?.id==authUser.id))?.map(el=> (
            <div>
             
                <li key={el.id}>
                <Link
                className="text-blue-800 underline underline-offset-1 font-semibold"
                to={`/document/${document.id}`}
                >
                {el?.attributes?.Title}
                </Link>
                </li>
              
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentList;
