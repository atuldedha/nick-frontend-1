const radioQuestions = [
    {
      id: 1,
      heading: "1. Will your group have walkers ?",
      options: [
        {
          id: 1,
          value: "yes",
          label: "Yes",
        },
        {
          id: 1,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput: {
        id: "1A",
        label: "1A. How many people will be in the group ?",
        placeholder: "Enter number of Walkers",
      },
    },
    {
      id: 2,
      heading: "2. Are you going to bring any cars ?",
      heading2:
        "(All cars must be decorated and any undecorated cars will  be removed from parade)",
      options: [
        {
          id: 2,
          value: "yes",
          label: "Yes",
        },
        {
          id: 2,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput: {
        id: "2A",
        label: "2A. How many cars will you bring ?",
        placeholder: "Enter number of Cars",
      },
    },
    {
      id: 3,
      heading: "3. Are you going to bring any SUVs ?",
      options: [
        {
          id: 3,
          value: "yes",
          label: "Yes",
        },
        {
          id: 3,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput: {
        id: "3A",
        label: "3A. How many SUVs will you bring ?",
        placeholder: "Enter number of SUVs",
      },
    },
    {
      id: 4,
      heading: "4. Are you going to bring any Pick-Up Trucks ?",
      options: [
        {
          id:4,
          value: "yes",
          label: "Yes",
        },
        {
          id: 4,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput1: {
        id: "4A",
        label: "4A. How many Pick-Ups truck will you bring ?",
        placeholder: "Enter number of Pick-Ups",
      },
      textInput2: {
        id: "4B",
        label: "4B. What will be the brand of Pick-Up Truck(s)?",
        placeholder: "Enter Brand(s)",
      },
    },
    {
      id: 5,
      heading:
        "5. Are you going to bring any Trailers attached to your SUV, Car or Pick-Up truck?",
      options: [
        {
          id: 5,
          value: "yes",
          label: "Yes",
        },
        {
          id: 5,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput: {
        id: "5A",
        label:
          "5A. How long is the total length from the front of the car to the end of the trailer in feet (Round up to the nearest foot E.G. 23.5ft = 24ft) please note we have a maximum limit of 28 ft in length?",
        placeholder: "Enter Length of Trailer in ft",
      },
    },
    {
      id: 6,
      heading: "6. Are you bringing any floats?",
      options: [
        {
          id: 6,
          value: "yes",
          label: "Yes",
        },
        {
          id: 6,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      textInput: {
        id: "6A",
        label:
          "6A. What is the length of the float in feet ? ( maximum limit of 28 ft in length ) ",
        placeholder: "Enter Float Length in ft",
      },
      radioInput: {
        id: "6B",
        label:
          "6B. Do you have a fire extinguisher on the float ? ( Mandatory ) ",
        options: [
          {
            id: "6B",
            value: "yes",
            label: "Yes",
          },
          {
            id: "6B",
            value: "no",
            label: "No",
            default: true,
          },
        ],
      },
    },
    {
      id: 7,
      heading: "7. Will you be bringing any animals ?",
      options: [
        {
          id: 7,
          value: "yes",
          label: "Yes",
        },
        {
          id: 7,
          value: "no",
          label: "No",
          default: true,
        },
      ],
      subRadios: [
        {
          id: "7A",
          label: "7A. Will you be bringing horses ?",
          options: [
            {
              id: "7A",
              value: "yes",
              label: "Yes",
            },
            {
              id: "7A",
              value: "no",
              label: "No",
              default: true,
            },
          ],
          radioInput: {
            id: "7A-1",
            label:
              "7A - 1. You will need to provide the parade with a certificate of insurance Are they insured?",
            options: [
              {
                id: "7A-1",
                value: "yes",
                label: "Yes",
              },
              {
                id: "7A-1",
                value: "no",
                label: "No",
                default: true,
              },
            ],
          },
          textInput: {
            id: "7A-2",
            label: "7A - 2. How many horses will you be bringing?",
            placeholder: "Enter number of Horses",
          },
        },
        {
          id: "7B",
          label: "7B. Will you be bringing any Dogs ?",
          options: [
            {
              id: "7B",
              value: "yes",
              label: "Yes",
            },
            {
              id: "7B",
              value: "no",
              label: "No",
              default: true,
            },
          ],
          textInput: {
            id: "7B-1",
            label: "7B - 1. How many Dogs will you be bringing ?",
            placeholder: "Enter number of Dogs",
          },
        },
        {
          id: "7C",
          label: "7C. Are you bringing any other animals ?",
          options: [
            {
              id: "7C",
              value: "yes",
              label: "Yes",
            },
            {
              id: "7C",
              value: "no",
              label: "No",
              default: true,
            },
          ],
          
          textInput: {
            id: "7C-1",
            label: "7C-1. Specify number and type of animals?",
            placeholder: "Enter number and type of animals",
          },
        },
      ],
    },
  ];

  export default radioQuestions;