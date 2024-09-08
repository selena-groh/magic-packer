import React from "react";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata = {
  title: {
    template: "%s | Magic Packer",
    default: "Magic Packer", // a default is required when creating a template
  },
  description:
    "Hi, I'm Selena. I'm a software developer, maker, and stage manager based in Boston, MA.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.robotoSerif.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
