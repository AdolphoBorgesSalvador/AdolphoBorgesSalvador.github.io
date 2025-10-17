/*!
    Title: Dev Portfolio Template (custom)
    Description: Scripts do site (menu, scroll, timeline, contato)
*/
(function ($) {
  // Ano atual
  $("#current-year").text(new Date().getFullYear());

  // Remove no-js
  $("html").removeClass("no-js");

  // Navegação com scroll suave
  $("header a").click(function (e) {
    if ($(this).hasClass("no-scroll")) return; // link externo
    e.preventDefault();
    var heading = $(this).attr("href");
    var $target = $(heading);
    if (!$target.length) return;
    var scrollDistance = $target.offset().top;

    $("html, body").animate(
      { scrollTop: scrollDistance + "px" },
      Math.min(800, Math.abs(window.pageYOffset - scrollDistance)) // duração proporcional
    );

    // fecha menu mobile se aberto
    if ($("header").hasClass("active")) {
      $("header, body").removeClass("active");
    }
  });

  // Topo
  $("#to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // Descer para próxima seção
  $("#lead-down span").click(function () {
    var $next = $("#lead").next();
    if ($next.length) {
      $("html, body").animate({ scrollTop: $next.offset().top + "px" }, 500);
    }
  });

  // Timeline de experiência
  $("#experience-timeline").each(function () {
    const $this = $(this);
    const $userContent = $this.children("div");

    // Cada bloco
    $userContent.each(function () {
      $(this)
        .addClass("vtimeline-content")
        .wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
    });

    // Ícone
    $this.find(".vtimeline-point").each(function () {
      $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
    });

    // Data
    $this.find(".vtimeline-content").each(function () {
      const date = $(this).data("date");
      if (date) {
        $(this).parent().prepend('<span class="vtimeline-date">' + date + "</span>");
      }
    });
  });

  // Menu mobile
  $("#mobile-menu-open").click(function () {
    $("header, body").addClass("active");
  });
  $("#mobile-menu-close").click(function () {
    $("header, body").removeClass("active");
  });

  // Mostrar mais projetos (se existir)
  $("#view-more-projects").click(function (e) {
    e.preventDefault();
    $(this).fadeOut(300, function () {
      $("#more-projects").fadeIn(300);
    });
  });

  // ------------------ Formulário de Contato (Formspree) ------------------
  const form = document.getElementById("form");          // <form id="form" ...>
  if (form) {
    const status = document.getElementById("form-status"); // <p id="form-status">
    const btn = form.querySelector('button[type="submit"]');

    async function handleSubmit(event) {
      event.preventDefault();

      if (status) {
        status.classList.remove("success", "error");
        status.textContent = "Enviando…";
      }
      if (btn) btn.classList.add("is-loading");

      try {
        const res = await fetch(form.action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          if (status) {
            status.textContent = "✅ Mensagem enviada com sucesso!";
            status.classList.add("success");
          }
          form.reset();
          showToast("Mensagem enviada!");
        } else {
          if (status) {
            status.textContent = "⚠️ Erro ao enviar. Tente novamente.";
            status.classList.add("error");
          }
        }
      } catch (err) {
        if (status) {
          status.textContent = "⚠️ Erro ao enviar. Tente novamente.";
          status.classList.add("error");
        }
      } finally {
        if (btn) btn.classList.remove("is-loading");
      }
    }

    form.addEventListener("submit", handleSubmit);

    // Toast simples (usa o CSS .toast que você colou)
    function showToast(msg) {
      let t = document.querySelector(".toast");
      if (!t) {
        t = document.createElement("div");
        t.className = "toast";
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 3000);
    }
  }
})(jQuery);
