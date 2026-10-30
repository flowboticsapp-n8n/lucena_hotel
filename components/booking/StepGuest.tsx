"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buttonClass } from "@/components/ui/Button";
import { isValidCPF, isValidPhone, maskCPF, maskPhone } from "@/lib/validation";
import type { Guest } from "@/lib/booking";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Informe seu nome completo")
    .refine((v) => v.split(/\s+/).length >= 2, "Informe nome e sobrenome"),
  email: z.email("E-mail inválido"),
  phone: z.string().refine(isValidPhone, "Telefone inválido"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  requests: z.string().max(500, "Máximo de 500 caracteres").optional(),
  terms: z.literal(true, { error: "Aceite a política para continuar" }),
});

type FormValues = z.input<typeof schema>;

type Props = {
  defaultValues?: Partial<Guest>;
  submitting: boolean;
  error: string | null;
  onSubmit: (guest: Guest) => void;
  onBack: () => void;
};

export function StepGuest({
  defaultValues,
  submitting,
  error,
  onSubmit,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      requests: "",
      ...defaultValues,
    },
  });

  const phone = register("phone");
  const cpf = register("cpf");

  return (
    <form
      noValidate
      onSubmit={handleSubmit(({ name, email, phone, cpf, requests }) =>
        onSubmit({ name, email, phone, cpf, requests }),
      )}
      className="bg-card p-6 sm:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
          Seus dados
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-[15px] underline underline-offset-4"
        >
          Trocar quarto
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field
          label="Nome completo"
          error={errors.name?.message}
          className="sm:col-span-2"
        >
          <input
            {...register("name")}
            autoComplete="name"
            className={input(errors.name)}
          />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={input(errors.email)}
          />
        </Field>
        <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
          <input
            {...phone}
            onChange={(e) => {
              e.target.value = maskPhone(e.target.value);
              phone.onChange(e);
            }}
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            placeholder="(87) 99999-9999"
            className={input(errors.phone)}
          />
        </Field>
        <Field label="CPF" error={errors.cpf?.message}>
          <input
            {...cpf}
            onChange={(e) => {
              e.target.value = maskCPF(e.target.value);
              cpf.onChange(e);
            }}
            inputMode="numeric"
            placeholder="000.000.000-00"
            className={input(errors.cpf)}
          />
        </Field>
        <div className="hidden sm:block" />
        <Field
          label="Pedidos especiais (opcional)"
          error={errors.requests?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("requests")}
            rows={4}
            placeholder="Ex.: chegada após as 22h, berço no quarto, aniversário…"
            className={`${input(errors.requests)} h-auto resize-none py-3`}
          />
        </Field>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-[14px] text-muted">
        <input
          type="checkbox"
          {...register("terms")}
          className="mt-0.5 size-5 shrink-0 accent-ink"
        />
        <span>
          Li e aceito a política de cancelamento: grátis até 48h antes do
          check-in.
        </span>
      </label>
      {errors.terms && (
        <p className="mt-2 text-[13px] text-red-700">{errors.terms.message}</p>
      )}

      {error && (
        <p className="mt-6 border-l-2 border-red-700 bg-white px-4 py-3 text-[15px]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={buttonClass("dark", "mt-8 w-full sm:w-auto")}
      >
        {submitting ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
            Confirmando…
          </>
        ) : (
          "Confirmar reserva"
        )}
      </button>
    </form>
  );
}

const input = (err?: unknown) =>
  `h-12 w-full border bg-white px-4 text-[16px] outline-none transition-colors placeholder:text-muted/50 focus:border-ink ${err ? "border-red-700" : "border-ink/15"}`;

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[14px] font-medium">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-[13px] text-red-700">{error}</span>
      )}
    </label>
  );
}
