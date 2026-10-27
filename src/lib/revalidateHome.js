import { revalidatePath } from "next/cache";

/** Bust the ISR cache for the public homepage after admin mutations. */
export function revalidateHome() {
  revalidatePath("/");
}
