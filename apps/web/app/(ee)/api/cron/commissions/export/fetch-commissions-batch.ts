import { getCommissions } from "@/lib/api/commissions/get-commissions";
import { getCommissionsQuerySchema } from "@/lib/zod/schemas/commissions";
import { z } from "zod";

type CommissionFilters = Omit<
  z.infer<typeof getCommissionsQuerySchema>,
  "page" | "pageSize"
> & {
  programId: string;
};

export async function* fetchCommissionsBatch(
  filters: CommissionFilters,
  pageSize: number = 1000,
) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const commissions = await getCommissions({
      ...filters,
      page,
      pageSize,
      includeProgramEnrollment: true,
    });

    if (commissions.length > 0) {
      yield { commissions };
      page++;
      hasMore = commissions.length === pageSize;
    } else {
      hasMore = false;
    }
  }
}
