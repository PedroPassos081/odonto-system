import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6FBFE] px-6 py-8">
      <div className="w-full max-w-115">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="relative h-16 w-16">
            <Image
              src="/logo.png"
              alt="Logo Drª Susana Lourenço"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="mt-4 text-2xl font-light tracking-[-0.03em] text-[#12384D]">
            Drª Susana Lourenço
          </h1>

          <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#60758A]">
            Medicina Dentária
          </p>
        </div>

        <section className="rounded-[1.7rem] border border-[#D8EDF8] bg-white px-8 py-8 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-[#12384D]">
              Bem-vinda
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#60758A]">
              Aceda ao sistema da Clínica Drª Susana Lourenço.
            </p>
          </div>

          <form className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#12384D]">
                E-mail
              </label>

              <input
                type="email"
                placeholder="nome@clinica.pt"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3 text-sm text-[#12384D] shadow-sm outline-none transition placeholder:text-[#60758A] focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#12384D]">
                Palavra-passe
              </label>

              <input
                type="password"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3 text-sm text-[#12384D] shadow-sm outline-none transition focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-2xl bg-[#399DCA] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
            >
              Entrar
            </Link>

            <div className="pt-1 text-center">
              <p className="text-sm text-[#60758A]">
                Primeira utilização?{" "}
                <Link
                  href="/dashboard"
                  className="font-medium text-[#2E91BD] transition hover:text-[#12384D]"
                >
                  Criar conta
                </Link>
              </p>
            </div>
          </form>
        </section>

        <p className="mt-6 text-center text-xs text-[#60758A]">
          Acesso restrito à equipa clínica.
        </p>
      </div>
    </main>
  );
}