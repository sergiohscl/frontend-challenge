import { useState } from "react";

import type { FormEvent } from "react";
import type { FooterNewsletterProps } from "../../types/footer.types";

export function FooterNewsletter({
  onSubscribe,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!onSubscribe || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubscribe(email.trim());
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h3 className="font-mono text-base leading-4 font-bold text-[#F5F1EB]">
        Antecipe-se ao próximo lançamento
      </h3>

      <form onSubmit={handleSubmit} className="flex w-full">
        <label htmlFor="footer-email" className="sr-only">
          Seu e-mail
        </label>

        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="digite seu e-mail..."
          className="
            h-10 min-w-0 flex-1 rounded-l-md
            bg-[#35200F] px-3
            font-mono text-xs text-[#F5F1EB]
            placeholder:text-[#A88459]
            outline-none
            focus-visible:ring-2 focus-visible:ring-[#D28A4C]
          "
        />

        <button
          type="submit"
          disabled={!onSubscribe || isSubmitting}
          className="
            h-10 shrink-0 rounded-r-md
            bg-[#D28A4C] px-4
            font-mono text-sm font-bold
            text-background
            enabled:hover:bg-[#E89B55]
            disabled:cursor-default
          "
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <p className="font-mono text-xs leading-5 text-[#CFB28C]">
        Receba lançamentos selecionados, histórias de criadores e novidades
        do mercado.
      </p>
    </div>
  );
}
