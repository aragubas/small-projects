<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
class Booking {
  id: number;
  username: string;
  bookedAt: string;
  notes: string;

  constructor(
    id: number,
    username: string,
    bookedAt: string,
    notes: string = ""
  ) {
    this.username = username;
    this.bookedAt = bookedAt;
    this.id = id;
    this.notes = notes;
  }
}

let today = new Date().toDateString();

const bookings = ref<Array<Booking>>(
  new Array<Booking>(
    new Booking(0, "Marck Exemplos", today, "Ceira ceira ceeirraa cceeiirrraa"),
    new Booking(1, "Sinencio Marktrales", today),
    new Booking(2, "Marksinas Trequela", today),
    new Booking(3, "CPF da Silva", today),
    new Booking(4, "Gurla Maqueda", today)
  )
);

const grabbing = ref(false);
const grabbingRow = ref<number | null>(null);
const grabbingElement = ref<HTMLElement | null>(null);
const headerElement = ref<HTMLElement | null>(null);

function deleteItem(booking: Booking) {
  bookings.value = bookings.value.filter(
    (element) => element.id !== booking.id
  );
}

function rowMouseUp(mouseEvent: MouseEvent) {
  grabbing.value = false;
  grabbingRow.value = null;
  grabbingElement.value = null;
}

function rowMouseMove(index: number) {
  if (!grabbing.value) {
    return;
  }

  let fromIndex = index;
  let toIndex = grabbingRow.value;

  if (toIndex == undefined) {
    console.error("Could not move: undefined");
    return;
  }

  if (toIndex == fromIndex) {
    return;
  }

  if (grabbingRow.value == null) {
    return;
  }

  let originalObj = bookings.value[grabbingRow.value];
  // bookings.value[grabbingRow.value].Id = index;

  bookings.value.splice(toIndex, 1);
  bookings.value.splice(fromIndex, 0, originalObj);

  // bookings.value = bookings.value.splice(fromIndex, toIndex, originalObj);

  grabbingRow.value = fromIndex;

  console.log(`from: ${fromIndex}, to: ${toIndex}`);
}

function grabInit(index: number) {
  if (grabbing.value) {
    return;
  }

  grabbing.value = true;
  grabbingRow.value = index;
}

onMounted(() => {
  document.addEventListener("mouseup", rowMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mouseup", rowMouseUp);
});
</script>

<template>
  <table>
    <caption>
      Table Title
    </caption>
    <tr ref="headerElement">
      <th>Username</th>
      <th>Booked At</th>
      <th>Notes</th>
      <th></th>
    </tr>

    <tr
      v-for="(booking, id) in bookings"
      class="row"
      :key="booking.id"
      :class="[grabbing && id == grabbingRow ? 'grabbing' : '']"
      @mousemove="rowMouseMove(id)"
    >
      <td>{{ booking.username }}</td>
      <td>{{ booking.bookedAt }}</td>
      <td>{{ booking.notes }}</td>
      <td class="buttons-row">
        <span @mousedown="grabInit(id)" class="grabber">=</span>
        <a @click="deleteItem(booking)" class="square-delete">X</a>
      </td>
    </tr>
  </table>
</template>

<style scoped>
p {
  margin: 0px;
}

.buttons-row {
  position: relative;
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.grabber {
  user-select: none;
  background-color: rgb(230, 230, 230);
  padding: 5px;
  flex: 1;
  cursor: grab;
  text-align: center;
  height: 100%;
}

tr.grabbing .grabber {
  cursor: grabbing;
  background-color: rgb(150, 150, 150);
  color: white;
}

a.square-delete {
  background-color: rgb(255, 120, 120);
  border: none;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  color: white;
  flex: 1;
  user-select: none;
}

a.square-delete:hover {
  background-color: rgb(255, 80, 80);
}

a.square-delete:active {
  background-color: rgb(255, 45, 45);
}

table {
  min-width: 450px;
  border-collapse: collapse;
  padding: 1rem;
}

table th,
table td {
  padding: 0.25rem;
}

table > caption {
  background: linear-gradient(0deg, rgb(245, 245, 245), transparent 85%);
}

table tr.row {
  transition: box-shadow 0.4s linear, background-color 0.15s linear;
  background-color: rgba(246, 246, 246);
  color: rgb(100, 100, 100);
  outline: thin solid;
  outline-width: 1px;
  outline-color: transparent;
}

table tr.row:nth-child(even) {
  background-color: rgba(250, 250, 250);
}

table tr.row.grabbing {
  transition: box-shadow 0.15s linear, background-color 0.15s linear;
  background-color: rgb(255, 255, 255);
  opacity: 0.95;
  cursor: grabbing;
  color: black;
  /* outline-color: rgba(0, 0, 0, 0.1); */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
}

table > tr > th {
  /* text-align: start; */
  font-size: 1.3rem;
  background-color: rgba(245, 245, 245);
}
</style>
