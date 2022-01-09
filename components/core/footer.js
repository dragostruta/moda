import Image from "next/image";

const Footer = () => {
  return (
    <div className="grid grid-rows-3 gap-7 px-20 py-7">
      <div className="flex items-center justify-center cursor-default">
        <Image src="/images/hanger.svg" width={32} height={32} />
        <p className="ml-2 text-2xl">
          Moda <strong>SCM</strong>
        </p>
      </div>
      <div className="text-sm grid grid-rows-1 grid-flow-col gap-10">
        <div className="flex items-center justify-center hover:text-teal-500 cursor-pointer">
          Acasa
        </div>
        <div className="flex items-center justify-center hover:text-teal-500 cursor-pointer">
          Contact
        </div>
        <div className="flex items-center justify-center hover:text-teal-500 cursor-pointer">
          Inregistrare
        </div>
        <div className="flex items-center justify-center hover:text-teal-500 cursor-pointer">
          Autentificare
        </div>
      </div>
      <div className="text-xs flex items-center justify-center cursor-default">
        @2022 - Moda SCM. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
