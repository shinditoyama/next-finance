import Head from "next/head";

export default function SEO({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Shindi Toyama" />
      <meta name="description" content="Sistema Financeiro feito em Next.js." />
      <meta name="keywords" content="Sistema Financeiro" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
