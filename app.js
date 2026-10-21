document.documentElement.classList.add("js");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const hero = document.querySelector(".hero-visual");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "pointermove",
    event => {
      if (window.innerWidth < 900) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 7;
      const y = (event.clientY / window.innerHeight - 0.5) * 7;
      hero.style.transform = `translate3d(${x * 0.7}px, ${y * 0.45}px, 0)`;
    },
    { passive: true }
  );
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// 滚动进度条与返回顶部按钮
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener(
  "scroll",
  () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;

    if (backToTop) {
      if (winScroll > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }
  },
  { passive: true }
);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 移动端折叠导航
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(item => {
    item.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}

// 滚动监听高亮（ScrollSpy）
const trackedSections = ["#family", "#memory", "#agent", "#clicker", "#compatibility"]
  .map(id => document.querySelector(id))
  .filter(Boolean);

const navItems = document.querySelectorAll(".nav-item");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

window.addEventListener(
  "scroll",
  () => {
    const scrollPos = window.scrollY + 160;
    let currentId = "";

    trackedSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = `#${section.id}`;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
    mobileNavItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
  },
  { passive: true }
);

// Agent 演示窗口标签切换互动
const sidebarItems = document.querySelectorAll(".agent-sidebar .sidebar-item");
sidebarItems.forEach(item => {
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    sidebarItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
