import { useEffect, useState } from "preact/hooks";
import { Gun, User, uuid } from "@/utils/gun.ts";

interface ChatProps {
  pub: string;
}

const paths = {
  front: {
    head: {
      disabled: true,
      d: "M11.672,6.359L11.623,3.768L15.83,1.3L20.258,4.253L20.217,6.197L20.459,2.853L18.428,0.542L15.583,0.025L13.378,0.554L11.442,3.185L11.672,6.359Z",
    },
    face: {
      disabled: true,
      d: "M19.749,6.703L19.769,4.496L15.802,1.732L12.061,3.968L12.055,6.603L11.448,6.643L11.722,8.468L12.698,8.807L13.141,10.988L14.963,13.053L16.998,12.992L18.79,11.048L19.15,8.808L20.126,8.468L20.378,6.684L19.749,6.703Z",
    },
    neck: {
      disabled: true,
      d: "M13.305,11.911L14.954,14.263L15.699,16.884L13.964,15.501L13.097,12.53L13.305,11.911ZM18.385,11.911L16.735,14.263L15.99,16.885L17.725,15.501L18.591,12.53L18.385,11.911Z",
    },
    "shoulder-left": {
      disabled: false,
      d: "M19.048,13.248L22.605,15.228L23.332,14.877L19.048,13.248ZM18.941,13.681L18.57,15.412L20.754,15.948L22.155,15.453L18.941,13.681ZM22.922,15.657L23.68,15.247L26.089,16.915L27.262,18.422L27.889,19.985L27.842,23.687L26.514,21.965L26.555,19.372L26.066,18.871C26.066,18.871 22.968,15.68 22.923,15.657L22.922,15.657ZM22.681,15.766C22.68,15.818 26.011,19.313 26.011,19.313L26.112,22.417L24.958,20.439L22.732,19.491L21.166,16.607L22.681,15.766Z",
    },
    "shoulder-right": {
      disabled: false,
      d: "M12.625,13.248L9.067,15.228L8.341,14.877L12.625,13.248ZM12.732,13.681L13.103,15.412L10.918,15.948L9.517,15.453L12.732,13.681ZM8.75,15.657L7.992,15.247L5.584,16.915L4.41,18.422L3.784,19.985L3.83,23.687L5.159,21.965L5.118,19.372L5.606,18.871C5.606,18.871 8.704,15.68 8.75,15.657L8.75,15.657ZM8.991,15.766C8.993,15.818 5.661,19.313 5.661,19.313L5.561,22.417L6.715,20.439L8.94,19.491L10.506,16.607L8.991,15.766Z",
    },
    "arm-left": {
      disabled: false,
      d: "M27.622,30.815L27.283,32.52L25.464,29.976L24.801,28.707L27.622,30.815ZM24.769,28.205C24.743,28.191 24.715,28.18 24.687,28.173L23.203,23.218L24.208,21.133L25.863,22.879L28.093,29.555L28.135,30.493C27.069,29.651 25.945,28.886 24.77,28.205L24.769,28.205ZM26.463,22.449L28.112,28.883L27.748,23.96L26.463,22.449Z",
    },
    "forearm-left": {
      disabled: false,
      d: "M26.955,32.969L28.256,43.258L27.148,43.268L25.255,35.272L25.446,30.735L26.955,32.969ZM28.175,31.019L27.588,33.606L28.707,42.762L29.265,42.545L29.496,35.775L28.175,31.019Z",
    },
    "arm-right": {
      disabled: false,
      d: "M4.075,30.815L4.413,32.52L6.232,29.976L6.895,28.707L4.075,30.815ZM6.927,28.205C6.953,28.191 6.981,28.18 7.01,28.173L8.493,23.218L7.489,21.133L5.833,22.879L3.603,29.555L3.562,30.493C4.627,29.651 5.751,28.886 6.926,28.205L6.927,28.205ZM5.233,22.449L3.584,28.883L3.949,23.96L5.233,22.449Z",
    },
    "forearm-right": {
      disabled: false,
      d: "M4.575,32.969L3.274,43.258L4.382,43.268L6.276,35.272L6.084,30.735L4.575,32.969ZM3.355,31.019L3.943,33.606L2.824,42.762L2.266,42.545L2.035,35.775L3.355,31.019Z",
    },
    "chest-left": {
      disabled: false,
      d: "M20.337,17.085L22.067,20.177L23.96,21.124L22.807,22.031L21.901,24.669L19.802,25.534L16.456,23.879L17.291,17.374L20.337,17.085Z",
    },
    "chest-right": {
      disabled: false,
      d: "M11.351,17.085L9.622,20.177L7.728,21.124L8.881,22.031L9.787,24.669L11.887,25.534L15.233,23.879L14.399,17.374L11.351,17.085Z",
    },
    "belly-left": {
      disabled: false,
      d: "M19.642,34.708L21.455,33.343L21.613,35.176L22.899,37.55L20.919,40.286L19.888,40.452L19.517,36.564L19.642,34.708Z",
    },
    "ribs-left": {
      disabled: false,
      d: "M19.289,26.152L16.177,24.746L16.271,27.026L19.072,28.462L19.289,26.152ZM21.224,27.82L19.93,28.542L20.08,26.833L21.224,27.82ZM20.171,26.183L22.65,25.151L21.717,27.672L20.171,26.183ZM21.702,27.921L20.012,28.954L19.723,31.022L21.373,29.947L21.702,27.921ZM18.791,29.025L18.729,30.649L16.426,30.149L16.301,27.932L18.791,29.025ZM18.635,31.429L18.666,33.428L16.457,34.022L16.426,30.899L18.635,31.429ZM21.29,30.444L19.806,31.478L19.6,33.587L21.248,32.263L21.29,30.444Z",
    },
    "belly-right": {
      disabled: false,
      d: "M12.046,34.708L10.233,33.343L10.075,35.176L8.789,37.551L10.77,40.287L11.801,40.452L12.172,36.565L12.046,34.708Z",
    },
    belly: {
      disabled: false,
      d: "M15.636,44.92L15.03,39.008L15.015,35.159L12.83,34.084L12.582,41.114L15.636,44.92ZM16.052,44.919L16.658,39.007L16.674,35.158L18.858,34.083L19.105,41.113L16.052,44.919Z",
    },
    "ribs-right": {
      disabled: false,
      d: "M12.399,26.152L15.511,24.746L15.418,27.026L12.616,28.462L12.399,26.152ZM10.464,27.821L11.758,28.542L11.608,26.833L10.464,27.821ZM11.517,26.184L9.038,25.151L9.972,27.673L11.517,26.184ZM9.986,27.921L11.676,28.955L11.964,31.022L10.316,29.947L9.986,27.921ZM12.897,29.025L12.959,30.649L15.263,30.15L15.387,27.933L12.897,29.025ZM13.053,31.43L13.022,33.428L15.232,34.022L15.263,30.899L13.053,31.43ZM10.398,30.445L11.882,31.478L12.088,33.587L10.438,32.264L10.398,30.445Z",
    },
    "thigh-left": {
      disabled: false,
      d: "M23.419,50.399L23.264,55.15L20.861,61.76L21.598,63.66L23.962,55.315L23.419,50.399ZM22.837,38.791L22.683,42.798L24.001,50.73L24.62,44.327L22.837,38.791ZM22.45,43.914L19.699,49.986L19.078,54.86L20.241,61.718L22.76,54.737L22.915,47.549L22.45,43.914Z",
    },
    "innerthigh-left": {
      disabled: false,
      d: "M22.063,39.37L22.063,43.583L19.117,49.408L17.257,55.192L17.451,51.185L22.063,39.37ZM18.814,52.796L18.749,52.95L17.536,55.852L18.319,63.04L19.555,62.379L18.484,55.686L18.814,52.796Z",
    },
    "feet-left": {
      disabled: false,
      d: "M17.256,87.868L17.38,91.321L17.67,92.527L18.541,92.527L18.79,91.695L19.081,91.654L19.019,92.486L20.118,92.152L20.408,91.986L21.653,91.716L21.694,90.738L20.491,88.701L19.661,87.661L17.628,86.829L17.256,87.868Z",
    },
    "calf-left": {
      disabled: false,
      d: "M18.251,70.441L18.542,71.356L19.164,75.224L19.247,80.381L18.376,85.414L18.417,78.967L17.505,76.389L17.379,73.56L18.251,70.441ZM20.243,72.77L20.035,80.507L18.376,86.746L20.181,85.893L23.189,75.057L22.152,68.236L20.243,72.77Z",
    },
    "knee-left": {
      disabled: false,
      d: "M21.405,64.784L21.529,65.907L20.658,66.989L20.367,68.695L19.786,68.944L19.288,66.366L18.956,65.451L19.247,64.868L21.405,64.784ZM17.546,64.868L18.169,66.614L19.496,69.193L19.164,71.564L18.21,68.902L17.422,67.405L17.546,64.868ZM22.524,62.497L21.57,67.613L22.192,67.28L22.69,68.944L22.524,62.497Z",
    },
    "thigh-right": {
      disabled: false,
      d: "M8.269,50.399L8.425,55.15L10.827,61.759L10.091,63.66L7.727,55.315L8.269,50.399ZM8.851,38.791L9.006,42.798L7.688,50.73L7.068,44.327L8.851,38.791ZM9.238,43.914L11.99,49.986L12.61,54.86L11.447,61.718L8.928,54.736L8.773,47.548L9.238,43.914Z",
    },
    genitalia: {
      disabled: true,
      d: "M14.404,45.04L14.427,45.012L14.278,44.633L11.176,41.228L10.943,41.146L13.003,46.466L14.404,45.04ZM13.232,47.058L14.509,50.358L14.935,46.309L14.683,45.666L13.232,47.058ZM17.284,45.04L17.262,45.012L17.411,44.633L20.512,41.229L20.745,41.146L18.686,46.466L17.284,45.04ZM18.457,47.058L17.18,50.358L16.753,46.309L17.005,45.666L18.457,47.058Z",
    },
    "innerthigh-right": {
      disabled: false,
      d: "M9.626,39.369L9.626,43.583L12.571,49.408L14.431,55.192L14.238,51.185L9.626,39.369ZM12.875,52.795L12.939,52.95L14.152,55.852L13.369,63.04L12.133,62.379L13.204,55.686L12.875,52.795Z",
    },
    "right-feet": {
      disabled: false,
      d: "M14.433,87.868L14.309,91.321L14.018,92.527L13.147,92.527L12.898,91.695L12.608,91.654L12.67,92.485L11.571,92.152L11.28,91.986L10.035,91.715L9.994,90.738L11.197,88.7L12.027,87.66L14.06,86.828L14.433,87.868Z",
    },
    "calf-right": {
      disabled: false,
      d: "M13.438,70.441L13.147,71.356L12.525,75.224L12.442,80.381L13.314,85.414L13.272,78.967L14.185,76.389L14.309,73.56L13.438,70.441ZM11.446,72.77L11.654,80.506L13.313,86.745L11.508,85.893L8.5,75.057L9.538,68.236L11.446,72.77Z",
    },
    "knee-right": {
      disabled: false,
      d: "M10.284,64.784L10.16,65.907L11.031,66.989L11.322,68.695L11.903,68.944L12.401,66.366L12.732,65.451L12.442,64.868L10.284,64.784ZM14.143,64.868L13.521,66.614L12.193,69.193L12.525,71.564L13.479,68.902L14.267,67.406L14.143,64.868ZM9.164,62.497L10.118,67.613L9.496,67.28L8.998,68.944L9.164,62.497Z",
    },
    "elbow-right": {
      disabled: false,
      d: "M3.205,27.37L3.21,30.464L2.631,32.376L2.085,29.964L3.205,27.37Z",
    },
    "hand-right": {
      disabled: true,
      d: "M4.39,43.563L2.871,43.614L2.104,42.943L0.892,45.1L0.029,48.429L0.523,48.65L1.121,46.448L1.621,46.701L1.265,49.196L1.889,49.439L2.303,46.947L2.861,47.126L2.635,49.892L3.404,50.214L3.662,47.347L4.12,47.329L4.286,49.981L4.946,50.244L5.017,45.678L5.359,45.484L6.712,47.167L7.04,46.824L6.314,44.769L4.39,43.563Z",
    },
    "elbow-left": {
      disabled: false,
      d: "M28.325,27.37L28.32,30.464L28.9,32.376L29.445,29.964L28.325,27.37Z",
    },
    "hands-left": {
      disabled: true,
      d: "M27.14,43.563L28.66,43.614L29.426,42.943L30.639,45.1L31.501,48.429L31.008,48.65L30.409,46.448L29.909,46.701L30.266,49.196L29.642,49.439L29.228,46.947L28.669,47.126L28.896,49.892L28.126,50.214L27.868,47.347L27.411,47.329L27.244,49.981L26.584,50.244L26.513,45.678L26.172,45.484L24.819,47.167L24.49,46.824L25.217,44.769L27.14,43.563Z",
    },
  },
  back: {
    "armback-left": {
      disabled: false,
      d: "M6.715,27.095L7.144,25.678L8.449,23.992L7.055,21.031L4.771,21.952L2.936,23.699L2.4,25.486L2.671,29.794L6.715,27.095ZM4.246,42.45L2.728,42.536L1.946,41.883L0.784,44.069L0,47.417L0.499,47.626L1.045,45.41L1.551,45.652L1.253,48.154L1.883,48.383L2.238,45.882L2.801,46.047L2.639,48.818L3.416,49.122L3.607,46.249L4.064,46.221L4.292,48.868L4.958,49.116L4.922,44.549L5.259,44.347L6.651,45.998L6.972,45.647L6.197,43.61L4.246,42.45ZM3.269,42.272L1.834,41.526L1.527,34.516C1.527,34.516 2.171,31.737 2.164,31.454L2.774,30.234L6.399,27.669L5.716,29.66L6.132,34.408L4.328,42.106L3.269,42.272Z",
    },
    "leg-left": {
      disabled: false,
      d: "M14.705,64.099L13.499,67.114L14.206,67.379L15.104,70.897L14.546,66.885L14.705,64.099ZM9.62,60.949L10.254,62.81L10.422,64.843L11.035,66.774L10.129,66.689L9.844,68.848L9.62,60.949ZM13.921,67.537L15.198,72.534L14.908,75.557L14.23,85.623L12.566,86.258L9.062,74.288L10.312,67.113L13.921,67.537ZM14.462,88.366L15.314,89.724L15.686,90.517L15.53,91.734L14.76,92.479L13.248,92.604L12.118,92.312L11.876,91.353L12.684,90.049L12.458,89.189L12.755,88.348L12.736,86.533L14.271,85.984L14.462,88.366ZM13.266,88.834L13.425,90.091L12.823,91.066M12.279,91.361L13.344,91.762L14.897,91.111M10.703,51.576L15.254,49.537L15.893,49.768L15.928,51.575L16.003,56.221L14.024,62.264L14.501,63.678L13.072,66.973L11.306,66.671L10.806,64.555L10.636,62.799L8.215,54.641L7.872,50.994L10.703,51.576Z",
    },
    buttock: {
      disabled: false,
      d: "M8.272,39.714L13.755,41.579L16.029,42.916L18.771,41.172L23.289,39.892L24.189,42.189L24.864,45.623L24.052,50.652L21.225,50.82L17.113,49.144L16.105,49.535L15.146,49.136L10.706,51.081L7.935,50.566L6.984,44.413L7.351,41.626L8.272,39.714Z",
    },
    loin: {
      disabled: false,
      d: "M15.347,37.335L15.492,40.308L16.651,40.283L16.699,37.319L19.508,36.499L21.848,35.745L23.19,39.478L18.411,40.842L16.078,42.058L13.702,40.825L8.246,39.448L9.765,35.49L15.347,37.335Z",
    },
    column: {
      disabled: false,
      d: "M15.263,14.814L15.801,40.144L16.291,40.115L16.948,14.776L16.666,13.934L15.416,13.934L15.263,14.814Z",
    },
    "head-back": {
      disabled: true,
      d: "M11.686,6.384L12.128,6.234L12.29,6.398L13.771,10.446L16.095,11.897L18.495,10.373L19.471,6.683L19.998,6.124L20.232,6.222L20.474,2.878L18.443,0.567L15.597,0.05L13.393,0.58L11.457,3.21L11.686,6.384Z",
    },
    nape: {
      disabled: true,
      d: "M15.899,12.13L13.541,10.58L12.07,6.628L11.462,6.669L11.736,8.493L12.713,8.832L13.474,11.048L13.804,12.117L13.894,14.265L15.058,14.273L15.164,13.565L15.711,13.505L15.899,12.13ZM16.917,13.606L17.154,14.256L18.535,14.252L18.545,11.864L18.805,11.073L19.377,8.904L20.141,8.493L20.392,6.709L19.764,6.729L18.679,10.628L16.282,12.095L16.558,13.58L16.917,13.606Z",
    },
    "armback-right": {
      disabled: false,
      d: "M25.186,27.276L24.859,26.224L23.585,24.17L24.972,21.205L27.258,22.121L29.097,23.864L29.637,25.649L29.376,29.958L25.186,27.276ZM27.83,42.617L29.349,42.7L30.129,42.045L31.296,44.228L32.088,47.574L31.589,47.785L31.038,45.571L30.532,45.813L30.836,48.315L30.207,48.545L29.846,46.045L29.284,46.211L29.451,48.982L28.675,49.288L28.478,46.416L28.021,46.388L27.799,49.036L27.133,49.285L27.159,44.718L26.821,44.517L25.433,46.172L25.112,45.821L25.882,43.782L27.83,42.617ZM28.807,42.437L30.24,41.688L30.531,34.678C30.531,34.678 29.881,31.9 29.887,31.616L29.274,30.399L25.293,27.823L26.315,29.758L25.926,34.58L27.747,42.273L28.807,42.437Z",
    },
    "leg-right": {
      disabled: false,
      d: "M17.548,64.099L18.754,67.114L18.047,67.379L17.149,70.897L17.707,66.885L17.548,64.099ZM22.633,60.949L22,62.81L21.831,64.843L21.218,66.774L22.124,66.689L22.41,68.848L22.633,60.949ZM18.332,67.537L17.055,72.534L17.345,75.557L18.024,85.623L19.687,86.258L23.191,74.288L21.941,67.113L18.332,67.537ZM17.791,88.366L16.939,89.724L16.567,90.517L16.723,91.734L17.493,92.479L19.005,92.604L20.135,92.312L20.377,91.353L19.569,90.049L19.795,89.189L19.498,88.348L19.518,86.533L17.982,85.984L17.791,88.366ZM18.987,88.834L18.828,90.091L19.43,91.066M19.974,91.361L18.91,91.762L17.356,91.111M20.922,51.208L16.942,49.506L16.378,49.777L16.325,51.575L16.25,56.221L18.229,62.264L17.753,63.678L19.181,66.973L20.947,66.671L21.448,64.555L21.617,62.799L24.038,54.641L24.047,50.958L20.922,51.208Z",
    },
    "back-right": {
      disabled: false,
      d: "M26.392,16.711L27.967,18.276L28.781,20.345L28.819,22.874L27.33,21.634L24.568,20.479L22.721,23.913L21.584,29.41L21.508,35.27L17.437,36.379L17.54,28.438L19.482,23.538L24.525,15.344L26.392,16.711Z",
    },
    "clavicule-right": {
      disabled: false,
      d: "M18.968,14.754L18.905,12.129L19.619,13.281L23.999,14.779L19.021,23.146L17.19,28.228L17.41,14.674L18.968,14.754Z",
    },
    "back-left": {
      disabled: false,
      d: "M5.73,16.612L4.155,18.177L3.341,20.246L2.955,22.774L4.792,21.535L7.554,20.38L9.401,23.814L10.538,29.311L10.614,35.17L14.685,36.28L14.582,28.339L12.641,23.439L7.597,15.245L5.73,16.612Z",
    },
    "clavicule-left": {
      disabled: false,
      d: "M13.154,14.654L13.217,12.03L12.503,13.182L8.123,14.68L13.101,23.047L14.932,28.129L14.712,14.575L13.154,14.654Z",
    },
  },
};

export default function Counter(props: ChatProps) {
  const gun = Gun.value;
  const user = User.value;

  const [pub, setPub] = useState(props.pub);
  const [showBack, setShowBack] = useState(false);
  const [selectedParts, setSelectedParts] = useState({
    head: false,
    face: false,
    neck: false,
    "shoulder-left": false,
    "shoulder-right": false,
    "arm-left": false,
    "forearm-left": false,
    "arm-right": false,
    "forearm-right": false,
    "chest-left": false,
    "chest-right": false,
    "belly-left": false,
    "ribs-left": false,
    "belly-right": false,
    belly: false,
    "ribs-right": false,
    "thigh-left": false,
    "innerthigh-left": false,
    "feet-left": false,
    "calf-left": false,
    "knee-left": false,
    "thigh-right": false,
    genitalia: false,
    "innerthigh-right": false,
    "right-feet": false,
    "calf-right": false,
    "knee-right": false,
    "elbow-right": false,
    "hand-right": false,
    "elbow-left": false,
    "hands-left": false,
    "armback-left": false,
    "leg-left": false,
    buttock: false,
    loin: false,
    column: false,
    "head-back": false,
    nape: false,
    "armback-right": false,
    "leg-right": false,
    "back-right": false,
    "clavicule-right": false,
    "back-left": false,
    "clavicule-left": false,
  });
  const [certificate, setCertificate] = useState("");
  const [refPhotoSrc, setRefPhotoSrc] = useState("");

  useEffect(() => {
    gun
      .user(pub)
      .get("certificates")
      .get("consultations")
      .once((data) => {
        setCertificate(data);
      });
  }, []);

  function handleClick(event, part) {
    setSelectedParts((selectedParts) => {
      const updatedParts = selectedParts;

      updatedParts[part] = !updatedParts[part];

      return { ...updatedParts };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const photoFormData = new FormData();
    photoFormData.append("file", fileInput.current.files[0]);

    const response = await fetch("/api/upload", {
      method: "post",
      body: photoFormData,
    });

    const upload = await response.json();

    var form = event.target;
    var formData = new FormData(form);

    let data = {};

    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }

    for (var [key, value] of Object.entries(selectedParts)) {
      if (value) {
        data[key] = value;
      }
    }

    data["referencePhoto"] = upload.cid;

    if (!user.is) {
      const pair = await SEA.pair();

      localStorage.setItem("pair", JSON.stringify(pair));

      user.auth(pair);
    }

    gun
      .user(pub)
      .get("consultations")
      .get(user.is.pub)
      .get(uuid())
      .put(data, null, { opt: { cert: certificate } });
  }

  function autoFormatPhoneNumber(phoneNumberString) {
    try {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(1|)?(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);
      var intlCode = match[1] ? "+1 " : "";
      return [
        intlCode,
        match[2] ? "(" : "",
        match[2],
        match[3] ? ") " : "",
        match[3],
        match[4] ? "-" : "",
        match[4],
      ].join("");
    } catch (err) {
      return "";
    }
  }

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      setRefPhotoSrc(src);
    }
  }

  return (
    <div
      class="h-screen"
      style="background-image: url('/scene1.jpg'); background-size: cover; background-position: center;"
    >
      <div
        class="h-full flex flex-wrap justify-center"
        style="background: linear-gradient(0.1turn, rgba(46, 52, 64, 1), rgba(46, 52, 64, 1), rgba(46, 52, 64, 0.75));"
      >
        <form
          enctype="multipart/form-data"
          name="information"
          class="w-[840px] flex flex-col gap-5 text-xl p-20"
          onSubmit={handleSubmit}
        >
          <h1 class="font-cinzel-decorative text-5xl font-bold">
            Online Consultation
          </h1>

          <p class="font-spectral text-2xl text-[#D8DEE9]">
            Select all of the body parts on the diagram applicable to the area
            you want tattooed. Additionally, please provide the information
            requested on the form below.
          </p>

          <div class="flex gap-5">
            <div class="flex flex-col gap-1 bg-[#3B4252] p-4 rounded-xl">
              <label for="firstName" class="text-[#D8DEE9] text-lg">
                Legal first name
              </label>
              <input
                type="text"
                placeholder="Jessie"
                id="firstName"
                name="firstName"
                class="bg-transparent text-2xl outline-none"
              />
            </div>
            <div class="flex flex-col gap-1 bg-[#3B4252] p-4 rounded-xl">
              <label for="lastName" class="text-[#D8DEE9] text-lg">
                Legal last name
              </label>
              <input
                type="text"
                placeholder="Doe"
                id="lastName"
                name="lastName"
                class="bg-transparent text-2xl outline-none"
              />
            </div>
          </div>
          <div class="flex flex-col bg-[#3B4252] p-4 rounded-xl">
            <label for="dob" class="text-[#D8DEE9] text-lg">
              Date of birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              class="bg-transparent text-2xl"
            />
          </div>

          <div class="flex flex-col bg-[#3B4252] p-4 rounded-xl">
            <label for="email" class="text-[#D8DEE9] text-lg">
              Email
            </label>
            <input
              type="email"
              placeholder="jessie.doe@example.com"
              id="email"
              name="email"
              class="bg-transparent text-2xl outline-none"
            />
          </div>

          <div class="flex gap-5">
            <div class="flex-grow flex flex-col bg-[#3B4252] p-4 rounded-xl">
              <label for="email" class="text-[#D8DEE9] text-lg">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                id="phoneNumber"
                name="phoneNumber"
                class="bg-transparent text-2xl outline-none"
                onInput={(e) =>
                  (e.target.value = autoFormatPhoneNumber(e.target.value))
                }
              />
            </div>

            <div class="flex-grow flex flex-col bg-[#3B4252] p-4 rounded-xl">
              <label for="phoneProvider" class="text-[#D8DEE9] text-lg">
                Phone provider
              </label>
              <select
                name="phoneProvider"
                id="phoneProvider"
                class="bg-transparent appearance-none outline-none"
              >
                <option value="">Choose Option</option>
                <option value="Verizon Wireless">Verizon Wireless</option>
                <option value="T-Mobile">T-Mobile</option>
                <option value="AT&T">AT&T</option>
                <option value="Sprint">Sprint</option>
                <option value="U.S. Cellular">U.S. Cellular</option>
                <option value="Twigby">Twigby</option>
                <option value="H2O Wireless">H2O Wireless</option>
                <option value="Mint Mobile">Mint Mobile</option>
                <option value="FreeUp">Appalachian Wireless</option>
                <option value="Xfinity Mobile">Xfinity Mobile</option>
                <option value="Tracfone">Tracfone</option>
                <option value="Republic Wireless">Republic Wireless</option>
                <option value="Total By Verizon">Total By Verizon</option>
                <option value="Google Fi">Google Fi</option>
              </select>
            </div>
          </div>

          {/*<div class="flex-grow flex flex-col bg-[#3B4252] p-4 rounded-xl">
            <label for="referencePhoto" class="text-[#D8DEE9] text-lg">
              Reference photo
            </label>
            {refPhotoSrc ? (
              <img
                id="referencePhotoPreview"
                src={refPhotoSrc}
                class="rounded-xl"
              />
            ) : (
              <input
                type="file"
                name="referencePhoto"
                id="referencePhoto"
                accept="image/*"
                onChange={(e) => showPreview(e)}
              />
            )}
          </div>*/}

          <button class="bg-[#D8DEE9] text-[#2E3440] font-bold py-2 px-4">
            Continue
          </button>
        </form>

        <div class="order-first w-[640px] py-20 lg:order-last">
          <div class="sticky top-20 flex flex-col items-center gap-5">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 31.55 92.60399627685547"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-grow max-h-[640px]"
              fill="currentColor"
            >
              {Object.keys(paths).map((side) => (
                <g
                  id={side}
                  class={`transition-all duration-200 origin-center ease-in-out ${
                    side === "front"
                      ? showBack
                        ? "pointer-events-none"
                        : "z-10 delay-100"
                      : showBack
                      ? "z-10 delay-100"
                      : "pointer-events-none"
                  }`}
                  style={`${
                    side === "front"
                      ? showBack
                        ? "transform: rotateY(90deg);"
                        : ""
                      : showBack
                      ? ""
                      : "transform: rotateY(90deg);"
                  }`}
                >
                  {Object.keys(paths[side]).map((part) => (
                    <path
                      id={part}
                      class={
                        paths[side][part].disabled
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                      fill={`${
                        paths[side][part].disabled
                          ? "#BF616A"
                          : selectedParts[part]
                          ? "#EBCB8B"
                          : "#D8DEE9"
                      }`}
                      d={paths[side][part].d}
                      onClick={(e) => {
                        handleClick(e, part);
                      }}
                    ></path>
                  ))}
                </g>
              ))}
            </svg>

            <button
              class="bg-[#D8DEE9] text-[#2E3440] font-bold text-xl py-2 px-4 select-none"
              onClick={() => setShowBack(!showBack)}
            >
              Show {showBack ? "Front" : "Back"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
