
import { createMachine, assign } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        DONE: "success",
        ERROR: "failure",
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading"},
      },
    },
  },
};

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: '',
  },
  states: {
    initial: {
      on: {
          START: {
            target: 'search',
          },
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            selectedCountry: (context, event) => event.selectedCountry
          })
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: {
          target: 'initial',
          actions: 'cleanContext',
        },
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      },
    },
    tickets: {
      on: {
        FINISH: "initial",
      },
    },
  },
},
{
  actions: {
    cleanContext: assign({
      selectedCountry: '',
      passengers: [],
    })
  },
}
);

export default bookingMachine;