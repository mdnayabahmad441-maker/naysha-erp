import { prisma } from "../../../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function CreateSchoolPage() {
  async function createSchool(formData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const city = formData.get("city");

    const planName = formData.get("planName");
    const price = parseInt(formData.get("price"));
    const durationMonths = parseInt(formData.get("durationMonths"));

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const school = await prisma.school.create({
      data: {
        name,
        email,
        phone,
        address,
        city,
      },
    });

    await prisma.schoolSubscription.create({
      data: {
        schoolId: school.id,
        planName,
        price,
        startDate,
        endDate,
        status: "ACTIVE",
      },
    });

    redirect("/platform/schools");
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Create New School</h1>

      <form action={createSchool} className="space-y-6 max-w-xl">
        <input
          name="name"
          placeholder="School Name"
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="city"
          placeholder="City"
          className="w-full p-3 rounded bg-white/10"
        />

        <select
          name="planName"
          required
          className="w-full p-3 rounded bg-white/10"
        >
          <option value="">Select Plan</option>
          <option value="Basic">Basic - ₹500</option>
          <option value="Standard">Standard - ₹1000</option>
          <option value="Premium">Premium - ₹1500</option>
        </select>

        <select
          name="durationMonths"
          required
          className="w-full p-3 rounded bg-white/10"
        >
          <option value="1">1 Month</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>

        {/* Hidden price field auto-set by JS */}
        <input type="hidden" name="price" />

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
        >
          Create School
        </button>
      </form>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            const planSelect = document.querySelector('[name="planName"]');
            const priceInput = document.querySelector('[name="price"]');

            planSelect.addEventListener('change', function() {
              if (this.value === 'Basic') priceInput.value = 500;
              if (this.value === 'Standard') priceInput.value = 1000;
              if (this.value === 'Premium') priceInput.value = 1500;
            });
          `,
        }}
      />
    </div>
  );
}