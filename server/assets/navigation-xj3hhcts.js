import { useLocation, useNavigate } from "@tanstack/react-router";
function useRouter() {
  const navigate = useNavigate();
  return {
    push: (to) => navigate({ to }),
    replace: (to) => navigate({ to, replace: true }),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload()
  };
}
function usePathname() {
  return useLocation({
    select: (location) => location.pathname
  });
}
export {
  useRouter as a,
  usePathname as u
};
