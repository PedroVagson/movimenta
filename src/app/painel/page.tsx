import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import styles from "./painel.module.css";

export default async function PainelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("nome, email, setor, cargo, role")
    .eq("id", user.id)
    .single();

  const email = profile?.email ?? user.email ?? "";
  const setor = profile?.setor ?? "Vendas";
  const cargo = profile?.cargo ?? "Vendedor";

  const role =
    profile?.role === "admin"
      ? "Administrador"
      : profile?.role === "gestor"
      ? "Gestor"
      : "Usuário";

  const usuarioCurto =
    email.split("@")[0] || profile?.nome || "usuário";

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.userInfo}>
          {email} · {setor} / {cargo} · {role}
        </div>

        <div className={styles.topActions}>
          <button type="button" className={styles.topButton}>
            Equipe e acessos
          </button>

          <button type="button" className={styles.topButton}>
            Integração TID
          </button>

          <button type="button" className={styles.topButton}>
            Sair
          </button>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.brandArea}>
          <div className={styles.logoBox}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 38 38"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 4 4.5 11.5 19 19l14.5-7.5L19 4Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 18 19 25.5 33.5 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 25 19 32.5 33.5 25"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className={styles.brand}>
            movimenta
          </h1>

          <div className={styles.divider} />

          <span className={styles.systemName}>
            Central de solicitações
          </span>
        </div>

        <div className={styles.areaControls}>
          <span className={styles.areaLabel}>
            Área
          </span>

          <select
            className={styles.areaSelect}
            defaultValue={setor}
          >
            <option value="Vendas">Vendas</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Logística">Logística</option>
          </select>

          <div className={styles.userBadge}>
            {usuarioCurto}
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.breadcrumb}>
          OPERAÇÕES &nbsp;›&nbsp; FLUXO ENTRE SETORES
        </div>

        <div className={styles.titleRow}>
          <div>
            <h2 className={styles.pageTitle}>
              {setor}
            </h2>

            <p className={styles.pageDescription}>
              Solicitações internas · acompanhe cada movimentação entre setores.
            </p>
          </div>

          <button
            type="button"
            className={styles.primaryButton}
          >
            ＋ Nova solicitação
          </button>
        </div>

        <div className={styles.boardHeader}>
          <div className={styles.boardTitleArea}>
            <div className={styles.boardIcon}>
              <span />
              <span />
              <span />
              <span />
            </div>

            <h3 className={styles.boardTitle}>
              Quadro de movimentações
            </h3>

            <span className={styles.boardCount}>
              3
            </span>
          </div>

          <div className={styles.boardActions}>
            <button
              type="button"
              className={styles.linkAction}
            >
              Exemplo de cadastro
            </button>

            <button
              type="button"
              className={styles.iconAction}
              aria-label="Atualizar"
            >
              ↻
            </button>
          </div>
        </div>

        <div className={styles.dividerLine} />

        <div className={styles.searchSection}>
          <label className={styles.searchLabel}>
            Pesquisar solicitações
          </label>

          <div className={styles.searchRow}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Número, título, cliente, CPF/CNPJ, PV ou responsável"
                className={styles.searchInput}
              />
            </div>

            <span className={styles.searchCount}>
              3 solicitações
            </span>
          </div>

          <p className={styles.searchHelp}>
            Busque em todas as etapas. Use # e o número para encontrar uma solicitação exata.
          </p>

          <div className={styles.alertRow}>
            <span>◷</span>

            <span>
              Alerta após 4 dias na mesma etapa
            </span>

            <span className={styles.savedStatus}>
              Dados salvos no sistema
            </span>
          </div>
        </div>
        <div className={styles.kanbanGrid}>
  <div className={styles.stageColumn}>
    <div className={styles.stageHeader}>
      <div className={styles.stageTitleArea}>
        <span className={`${styles.stageDot} ${styles.dotBlue}`} />
        <h4 className={styles.stageTitle}>Cadastro</h4>
      </div>

      <div className={styles.stageHeaderActions}>
        <span className={styles.stageCount}>0</span>
        <button type="button" className={styles.addStageButton}>
          +
        </button>
      </div>
    </div>

    <div className={styles.stageBody}>
      <div className={styles.emptyStage}>
        <div className={styles.emptyIcon}>▱</div>

        <p className={styles.emptyTitle}>
          Nenhuma solicitação
        </p>

        <p className={styles.emptyText}>
          Crie uma solicitação para começar.
        </p>
      </div>
    </div>

    <div className={styles.stageFooter}>
      01 / Cadastro
    </div>
  </div>

  <div className={styles.stageColumn}>
    <div className={styles.stageHeader}>
      <div className={styles.stageTitleArea}>
        <span className={`${styles.stageDot} ${styles.dotPurple}`} />
        <h4 className={styles.stageTitle}>Comercial</h4>
      </div>

      <div className={styles.stageHeaderActions}>
        <span className={styles.stageCount}>1</span>
      </div>
    </div>

    <div className={styles.stageBody}>
      <div className={styles.requestCard}>
        <div className={styles.requestTop}>
          <span className={styles.requestNumber}>
            #0004
          </span>

          <span className={styles.dragIcon}>
            ⠿
          </span>
        </div>

        <h5 className={styles.requestTitle}>
          Teste 2
        </h5>

        <p className={styles.requestSubtitle}>
          Solicitação interna
        </p>

        <div className={styles.responsibleRow}>
          <div className={styles.avatar}>
            P
          </div>

          <div>
            <p className={styles.responsibleLabel}>
              Responsável
            </p>

            <p className={styles.responsibleName}>
              pedro
            </p>
          </div>
        </div>

        <p className={styles.requester}>
          Solicitante: pedro
        </p>

        <div className={styles.cardDivider} />

        <div className={styles.cardActions}>
          <button type="button" className={styles.openButton}>
            Abrir
          </button>

          <button type="button" className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <div className={styles.stageFooter}>
      02 / Comercial
    </div>
  </div>

  <div className={styles.stageColumn}>
    <div className={styles.stageHeader}>
      <div className={styles.stageTitleArea}>
        <span className={`${styles.stageDot} ${styles.dotYellow}`} />
        <h4 className={styles.stageTitle}>Receber</h4>
      </div>

      <div className={styles.stageHeaderActions}>
        <span className={styles.stageCount}>1</span>
      </div>
    </div>

    <div className={styles.stageBody}>
      <div className={styles.requestCard}>
        <div className={styles.requestTop}>
          <span className={styles.requestNumber}>
            #0001
          </span>

          <span className={styles.dragIcon}>
            ⠿
          </span>
        </div>

        <h5 className={styles.requestTitle}>
          HARAS NAVILLE LTDA
        </h5>

        <p className={styles.requestSubtitle}>
          68.904.977/0001-77
        </p>

        <div className={styles.responsibleRow}>
          <div className={styles.avatar}>
            PN
          </div>

          <div>
            <p className={styles.responsibleLabel}>
              Responsável
            </p>

            <p className={styles.responsibleName}>
              Pedro Nogueira
            </p>
          </div>
        </div>

        <p className={styles.requester}>
          Solicitante: pedro
        </p>

        <div className={styles.cardDivider} />

        <div className={styles.cardActions}>
          <button type="button" className={styles.openButton}>
            Abrir
          </button>

          <button type="button" className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <div className={styles.stageFooter}>
      03 / Receber
    </div>
  </div>

  <div className={styles.stageColumn}>
    <div className={styles.stageHeader}>
      <div className={styles.stageTitleArea}>
        <span className={`${styles.stageDot} ${styles.dotCyan}`} />
        <h4 className={styles.stageTitle}>Logística</h4>
      </div>

      <div className={styles.stageHeaderActions}>
        <span className={styles.stageCount}>0</span>
      </div>
    </div>

    <div className={styles.stageBody}>
      <div className={styles.emptyStage}>
        <div className={styles.emptyIcon}>▱</div>

        <p className={styles.emptyTitle}>
          Nenhuma solicitação
        </p>

        <p className={styles.emptyText}>
          As solicitações desta etapa aparecem aqui.
        </p>
      </div>
    </div>

    <div className={styles.stageFooter}>
      04 / Logística
    </div>
  </div>

  <div className={styles.stageColumn}>
    <div className={styles.stageHeader}>
      <div className={styles.stageTitleArea}>
        <span className={`${styles.stageDot} ${styles.dotPink}`} />
        <h4 className={styles.stageTitle}>Fiscal</h4>
      </div>

      <div className={styles.stageHeaderActions}>
        <span className={styles.stageCount}>1</span>
      </div>
    </div>

    <div className={styles.stageBody}>
      <div className={styles.requestCard}>
        <div className={styles.requestTop}>
          <span className={styles.requestNumber}>
            #0003
          </span>

          <span className={styles.dragIcon}>
            ⠿
          </span>
        </div>

        <h5 className={styles.requestTitle}>
          Teste 2
        </h5>

        <p className={styles.requestSubtitle}>
          Solicitação interna
        </p>

        <div className={styles.responsibleRow}>
          <div className={styles.avatar}>
            P
          </div>

          <div>
            <p className={styles.responsibleLabel}>
              Responsável
            </p>

            <p className={styles.responsibleName}>
              pedro
            </p>
          </div>
        </div>

        <p className={styles.requester}>
          Solicitante: pedro
        </p>

        <div className={styles.cardDivider} />

        <div className={styles.cardActions}>
          <button type="button" className={styles.openButton}>
            Abrir
          </button>

          <button type="button" className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <div className={styles.stageFooter}>
      05 / Fiscal
    </div>
  </div>
</div>

<div className={styles.boardFooter}>
  <span>
    5 etapas conectadas · 0 com alerta de permanência
  </span>

  <span>
    Use Enviar no formulário para seguir o fluxo entre setores
  </span>
</div>
      </section>
    </main>
  );
}