import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDepartment } from "../../js/actions/departmentActions";

const Sidebar = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState(params.id);
  const { department } = useSelector((state) => state.department);
  console.log(department);
  console.log("sidebar params", params);
  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full  px-3 py-4 overflow-y-auto  bg-red-600">
          <img
            className="mx-auto h-28 w-auto"
            src="/images/Logo v.png"
            alt=" Logo"
          />
          <ul className="space-y-2 font-medium">
            <h2 className="text-white text-xl border-b-2 border-white font-semibold mt-12 mb-16 pb-5">
              Department
            </h2>
            {department?.map((el) => (
              <li>
                <Link
                  key={el?.id}
                  to={`/${el?.attributes?.type?.replace(/\s/g, "_")}`}
                >
                  <p
                    className={`text-white text-lg pt-3 pb-3 justify-items-center hover:bg-gray-700 group rounded-lg
                    ${
                      el?.attributes?.type?.replace(/\s/g, "_") ===
                      params.department
                        ? "bg-gray-700 group rounded-lg"
                        : ""
                    }
                    `}
                    // onClick={() => setSelectedDepartment("     ")}
                    // className={
                    //   selectedDepartment === "     "
                    //     ? "flex justify-items-center p-2  rounded-lg text-white  bg-gray-700 group"
                    //     : "flex justify-items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                    // }
                  >
                    {el?.attributes?.type}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
