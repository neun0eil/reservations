<template>
  <div class="lg:flex-1 lg:flex lg:h-full lg:flex-col">
    <header
      class="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none"
    >
      <h1 class="text-lg font-semibold text-gray-900">
        <time datetime="2022-01">{{ monthYear }}</time>
      </h1>
      <div class="flex items-center">
        <div class="flex items-center rounded-md shadow-sm md:items-stretch">
          <button
            @click="prevMonth"
            type="button"
            class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span class="sr-only">Mois précédent</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            @click="currentMonth"
            type="button"
            class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
          >
            Aujourd'hui
          </button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            @click="nextMonth"
            type="button"
            class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span class="sr-only">Mois suivant</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden md:ml-4 md:flex md:items-center">
          <div class="ml-6 h-6 w-px bg-gray-300" />
          <router-link
            :to="{ name: 'home' }"
            class="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ajouter un évènement
          </router-link>
        </div>
        <Menu as="div" class="relative ml-6 md:hidden">
          <MenuButton
            class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Ouvrir le menu</span>
            <DotsHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="focus:outline-none absolute right-0 mt-3 w-44 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'home' }"
                    class="block px-4 py-2 text-sm cursor-pointer"
                    :class="
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    "
                  >
                    Ajouter un évènement
                  </router-link>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    @click="currentMonth"
                    class="block px-4 py-2 text-sm cursor-pointer"
                    :class="
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    "
                    >Aller à aujourd'hui</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </header>
    <div
      class="shadow ring-1 ring-black ring-opacity-5 sm:rounded-md overflow-hidden lg:flex lg:flex-auto lg:flex-col"
    >
      <div
        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
      >
        <div class="bg-white py-2">
          L<span class="sr-only sm:not-sr-only">un</span>
        </div>
        <div class="bg-white py-2">
          M<span class="sr-only sm:not-sr-only">ar</span>
        </div>
        <div class="bg-white py-2">
          M<span class="sr-only sm:not-sr-only">er</span>
        </div>
        <div class="bg-white py-2">
          J<span class="sr-only sm:not-sr-only">eu</span>
        </div>
        <div class="bg-white py-2">
          V<span class="sr-only sm:not-sr-only">en</span>
        </div>
        <div class="bg-white py-2">
          S<span class="sr-only sm:not-sr-only">am</span>
        </div>
        <div class="bg-white py-2">
          D<span class="sr-only sm:not-sr-only">im</span>
        </div>
      </div>
      <div
        class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto"
      >
        <div
          class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px"
          :class="'lg:grid-rows-' + rows"
        >
          <div
            v-for="day in days"
            :key="day.date"
            class="relative py-2 px-3"
            :class="[
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
              day.isToday ? 'bg-indigo-100' : 'hover:bg-gray-100',
            ]"
          >
            <time
              :datetime="day.date"
              :class="
                day.isToday
                  ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                  : undefined
              "
              >{{ day.date.split("-").pop().replace(/^0/, "") }}</time
            >
            <ol v-if="day.events.length > 0" class="mt-2">
              <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                <a :href="event.href" class="group flex">
                  <p
                    class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
                  >
                    {{ event.name }}
                  </p>
                  <time
                    :datetime="event.datetime"
                    class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                    >{{ event.time }}</time
                  >
                </a>
              </li>
              <li v-if="day.events.length > 2" class="text-gray-500">
                + {{ day.events.length - 2 }} more
              </li>
            </ol>
          </div>
        </div>
        <div
          class="isolate grid w-full grid-cols-7 gap-px lg:hidden"
          :class="'grid-rows-' + rows"
        >
          <button
            v-for="day in days"
            :key="day.date"
            type="button"
            class="flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
            :class="[
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              (day.isSelected || day.isToday) && 'font-semibold',
              day.isSelected && 'text-white',
              !day.isSelected && day.isToday && 'text-indigo-600',
              !day.isSelected &&
                day.isCurrentMonth &&
                !day.isToday &&
                'text-gray-900',
              !day.isSelected &&
                !day.isCurrentMonth &&
                !day.isToday &&
                'text-gray-500',
            ]"
          >
            <time
              :datetime="day.date"
              class="ml-auto"
              :class="[
                day.isSelected &&
                  'flex h-6 w-6 items-center justify-center rounded-full',
                day.isSelected && day.isToday && 'bg-indigo-600',
                day.isSelected && !day.isToday && 'bg-gray-900',
              ]"
              >{{ day.date.split("-").pop().replace(/^0/, "") }}</time
            >
            <p class="sr-only">{{ day.events.length }} events</p>
            <div
              v-if="day.events.length > 0"
              class="-mx-0.5 mt-auto flex flex-wrap-reverse"
            >
              <div
                v-for="event in day.events"
                :key="event.id"
                class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="selectedDay?.events.length > 0"
      class="py-10 px-4 sm:px-6 lg:hidden"
    >
      <ol
        class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
      >
        <li
          v-for="event in selectedDay.events"
          :key="event.id"
          class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
        >
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">{{ event.name }}</p>
            <time
              :datetime="event.datetime"
              class="mt-2 flex items-center text-gray-700"
            >
              <ClockIcon
                class="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ event.time }}
            </time>
          </div>
          <a
            :href="event.href"
            class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
            >Edit<span class="sr-only">, {{ event.name }}</span></a
          >
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DotsHorizontalIcon,
} from "@heroicons/vue/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

const router = useRouter();
const route = useRoute();

// const days = [
//   {
//     date: "2022-01-03",
//     isCurrentMonth: true,
//     isToday: true,
//     isSelected: true,
//     events: [
//       {
//         id: 1,
//         name: "Design review",
//         time: "10AM",
//         datetime: "2022-01-03T10:00",
//         href: "#",
//       },
//     ],
//   },
// ];

const date = ref(
  route.params.year && route.params.month
    ? new Date(Number(route.params.year), Number(route.params.month) - 1)
    : new Date()
);

const monthYear = computed(() =>
  (s => s.charAt(0).toUpperCase() + s.substring(1))(
    new Intl.DateTimeFormat("fr-fr", {
      month: "long",
      year: "numeric",
    }).format(date.value)
  )
);

const days = computed(genMonth);
const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());
const rows = ref(1);
const selectedDay = computed(() => days.value.find(day => day.isSelected));

useHead({
  title: computed(() => `Calendrier - ${monthYear.value}`),
});

function updateMonth(value) {
  date.value = Number.isInteger(value)
    ? new Date(year.value, month.value + value)
    : new Date();
  router.push({
    name: "calendar",
    params: { year: year.value, month: month.value + 1 },
  });
}

const prevMonth = () => updateMonth(-1);
const nextMonth = () => updateMonth(1);
const currentMonth = () => updateMonth();

function genMonth() {
  const fn = n => (n < 10 ? "0" : "") + n;
  const fd = d =>
    `${d.getFullYear()}-${fn(d.getMonth() + 1)}-${fn(d.getDate())}`;
  const today = fd(new Date());
  const startOfMonth = new Date(year.value, month.value, 1).getDay() - 1;
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
  rows.value = Math.ceil((daysInMonth + startOfMonth) / 7);
  const iterations = rows.value * 7;
  const days = [];
  const cursor = new Date(year.value, month.value);
  cursor.setDate(1 - startOfMonth);
  for (let i = 0; i < iterations; i++) {
    const cfd = fd(cursor);
    const day = {
      date: cfd,
      events: [],
    };
    if (cursor.getMonth() === month.value) day.isCurrentMonth = true;
    if (today === cfd) day.isToday = true;
    days.push(day);
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}
</script>
