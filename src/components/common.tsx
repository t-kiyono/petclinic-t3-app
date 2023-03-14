import { type PropsWithChildren } from "react";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaList, FaSearch } from "react-icons/fa";

export function Page({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-gray-dark border-t-4 border-solid border-green">
        <div className="flex flex-row flex-nowrap justify-between mx-auto w-3/5">
          <Link href="/">
            <div className="group w-brand-x h-brand-y inline-block mt-3 mx-0 mb-1.5" style={{ background: "url(/images/spring-logo-dataflow.png) -1px -1px no-repeat" }}>
              <span className="w-brand-x h-brand-y block opacity-0 group-hover:opacity-100" style={{ background: "url(/images/spring-logo-dataflow.png) -1px -48px no-repeat" }} />
            </div>
          </Link>
          <div className="list-none flex flex-row flex-nowrap h-menu-y pr-4">
            <li>
              <Link href="/">
                <div className={`block text-white text-sm py-7 px-5 uppercase ${"/" === pathname ? "bg-green" : ""} hover:bg-green`}>
                  <span className="mr-1.5"><FaHome className="inline" /></span>Home
                </div>
              </Link>
            </li>
            <li>
              <Link href="/owners/find">
                <div className={`block text-white text-sm py-7 px-5 uppercase ${pathname.startsWith("/owners") ? "bg-green" : ""} hover:bg-green`}>
                  <span className="mr-1.5"><FaSearch className="inline" /></span>Find Owners
                </div>
              </Link>
            </li>
            <li>
              <Link href="/vets">
                <div className={`block text-white text-sm py-7 px-5 uppercase ${pathname.startsWith("/vets") ? "bg-green" : ""} hover:bg-green`}>
                  <span className="mr-1.5"><FaList className="inline" /></span>Veterinarians
                </div>
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-24 mx-auto px-1 w-3/5">
        {/* TODO ErrorBoundary で囲む */}
        {children}
      </div>
    </>
  );
}

export function CommonMeta({ title = "Petclinic", description = "This is Petclinic Application" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
  );
}

export function Loader() {
  return (
    <div className="
      bg-green
      animate-loader
      w-3
      h-16
      text-green
      -indent-[9999em]
      my-8
      mx-auto
      relative
      text-[11px]
      -animation-delay-160
      before:bg-green
      before:animate-loader
      before:w-3
      before:h-16
      before:absolute
      before:top-0
      before:conetnt-['']
      before:-left-[18px]
      before:-animation-delay-320
      after:bg-green
      after:animate-loader
      after:w-3
      after:h-16
      after:absolute
      after:top-0
      after:conetnt-['']
      after:left-[18px]
    "
    />
  );
}
