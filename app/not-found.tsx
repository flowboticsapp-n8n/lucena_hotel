import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="label text-muted">Erro 404</p>
        <h1 className="h-section mt-4">Página não encontrada</h1>
        <Button href="/" className="mt-8">Voltar ao início</Button>
      </div>
    </main>
  );
}
