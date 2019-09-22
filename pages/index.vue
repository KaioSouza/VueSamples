<template>
  <div>
    <b-button @click="clickMe">
      Click Me
    </b-button>
    <b-table
      :data="users"
      :columns="columns"
      draggable
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
    />
    <b-button
      class="is-success"
      @click="Salvar"
    >
      Salvar
    </b-button>
  </div>
</template>

<script>
import db from '@/fb'
export default {
  data () {
    return {
      users: [],
      columns: [
        {
          field: 'id',
          label: 'ID'
        },
        {
          field: 'nome',
          label: 'Nome'
        },
        {
          field: 'pos',
          label: 'Nome'
        },
        {
          field: 'idade',
          label: 'Idade'
        }
      ],
      draggingRow: null,
      draggingRowIndex: null
    }
  },
  created () {
    const usersArray = []
    this.users = db.collection('sample-collection').get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          usersArray.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            pos: doc.data().pos
          })
          console.log(usersArray.lenght)
        })
        this.users = usersArray.sort((a, b) => (a.pos > b.pos) ? 1 : -1)
      }).then(() => { console.log(usersArray) })
  },
  methods: {
    reorderArray (array, value, newPosition, oldPosition) {
      if (newPosition > oldPosition) {
        array.splice(newPosition + 1, 0, value)
        array.splice(oldPosition, 1)
      } else {
        array.splice(newPosition, 0, value)
        array.splice(oldPosition + 1, 1)
      }
    },
    clickMe () {
      const obj = { nome: 'Ana', idade: '19' }
      db.collection('sample-collection').add(obj)
    },
    Salvar () {
      // console.log(this.users)
      // const i = 0
      this.users.forEach((u, i) => {
        db.doc(`/sample-collection/${u.id}`).update({
          nome: u.nome,
          idade: u.idade,
          pos: i + 1
        })
      })
      this.$buefy.toast.open({ message: 'Salvo', type: 'is-success' })
    },
    dragstart (payload) {
      this.draggingRow = payload.row
      this.draggingRowIndex = payload.index
      payload.event.dataTransfer.effectAllowed = 'copy'
    },
    dragover (payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('tr').classList.add('is-selected')
      payload.event.preventDefault()
    },
    dragleave (payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      payload.event.preventDefault()
    },
    drop (payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      const droppedOnRowIndex = payload.index
      this.reorderArray(this.users, this.draggingRow, droppedOnRowIndex, this.draggingRowIndex)
    }
  }
}
</script>
