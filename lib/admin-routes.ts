// Constante da rota pública do admin (pode ser usada no cliente)
const ADMIN_GATE = "x";
const ADMIN_LAYER_ONE = "a9K3mP7xQ2vR";
const ADMIN_LAYER_TWO = "b4N8tL1cW6zD";
const ADMIN_PUBLIC_PREFIX = `/${ADMIN_GATE}/${ADMIN_LAYER_ONE}/${ADMIN_LAYER_TWO}`;

export function adminPath(pathname: string = "/"): string {
  if (!pathname || pathname === "/") return ADMIN_PUBLIC_PREFIX;
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${ADMIN_PUBLIC_PREFIX}${normalized}`;
}
