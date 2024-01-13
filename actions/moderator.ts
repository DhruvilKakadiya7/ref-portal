"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

interface moderatorUpdateProps {
    role: UserRole | undefined
    isVerified: boolean
    id: string
}


export const moderatorUpdate = async (
    data: moderatorUpdateProps
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { role, isVerified, id } = data;

    const dbUser = await getUserById(id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    const updatedUser = await db.user.update({
        where: { id: id },
        data: {
            role: role,
            isVerified: isVerified,
        }
    });

    return { success: "Settings Updated!", updatedUser }
}