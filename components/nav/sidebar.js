import Link from "next/link";
import { BookIcon, ChartIcon, HomeIcon, ClipBoardIcon } from "../icons/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [btnColored, setBtnColored] = useState("");
  const router = useRouter();

  useEffect(() => {
    switch (router.route) {
      case "/operations":
        setBtnColored("operations");
        break;
      case "/employees":
        setBtnColored("employees");
        break;
      case "/charts":
        setBtnColored("charts");
        break;
      case "/model":
        setBtnColored("model");
        break;
      default:
        setBtnColored("");
        break;
    }
  }, []);

  return (
    <div className="bg-white border-r font-semibold w-64 space-y-6 px-2 py-7 absolute left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
      <nav>
        <Link href="/operations">
          <a
            className={
              (btnColored === "operations" ? "text-teal-300 " : "") +
              "block py-2.5 px-6 transition duration-200 hover:text-teal-300 cursor-pointer"
            }
          >
            <div className="flex">
              <div className="pr-2">
                <BookIcon />
              </div>
              <span>Operatiuni</span>
            </div>
          </a>
        </Link>
        <div className="border-t border-solid border-gray-200" />
        <Link href="/model">
          <a
            className={
              (btnColored === "model" ? "text-teal-300 " : "") +
              "block py-2.5 px-6 transition duration-200 hover:text-teal-300 cursor-pointer"
            }
          >
            <div className="flex">
              <div className="pr-2">
                <BookIcon />
              </div>
              <span>Model</span>
            </div>
          </a>
        </Link>
        <div className="border-t border-solid border-gray-200" />
        <Link href="/employees">
          <a
            className={
              (btnColored === "employees" ? "text-teal-300 " : "") +
              "block py-2.5 px-6 transition duration-200 hover:text-teal-300 cursor-pointer"
            }
          >
            <div className="flex">
              <div className="pr-2">
                <ClipBoardIcon />
              </div>
              <span>Angajati</span>
            </div>
          </a>
        </Link>
        <div className="border-t border-solid border-gray-200" />
        <Link href="/charts">
          <a
            className={
              (btnColored === "charts" ? "text-teal-300 " : "") +
              "block py-2.5 px-6 transition duration-200 hover:text-teal-300 cursor-pointer"
            }
          >
            <div className="flex">
              <div className="pr-2">
                <ChartIcon />
              </div>
              <span>Norma</span>
            </div>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
