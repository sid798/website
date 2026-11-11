import { Courier_Prime } from "next/font/google";

const courier = Courier_Prime({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function V3Layout({ children }: LayoutProps<"/v3">) {
  return <div className={courier.variable}>{children}</div>;
}
