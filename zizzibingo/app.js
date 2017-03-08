
var options = [
  {
    label: 'Har surfet (uden success) på tæppe'
  },{
    label: 'Tager typisk fra med sit hovede når han falder på cykel',
  },{
    label: 'Må ikke længere cykle for Tine når han er fuld',
  },{
    label: 'Har sprunget i faldskærm',
  },{
    label: 'Har snavet en mand',
  },{
    label: 'Elsker i hemmelighed tv-programmet, Gift ved første blik'
  },{
    label: 'Har modtaget et blæs i et kosteskab og blevet opdaget.'
  },{
    label: 'Faldt engang som elev for det gamle trick "Smut lige ned efter en ny boble til watterpasset"'
  },{
    label: 'Var på bøssebar i USA uden at vide det.'
  },{
    label: 'Lorem ipsum'
  },
]



var Square = {
  template: '<div class="square"><div class="label"><slot></slot></div></div>',
}

function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}
function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}
function deltaSize(x) {
  return 
}
new Vue({
  el: '#app',
  components: {
    'square': Square,
  },
  methods: {
    getFontSize(str) {
      var x = str.length
      if(x<10) {
        return 3
      } else if(x<20) {
        return 2.2
      } else if(x<30) {
        return 1.5
      } else if(x<40) {
        return 1.3
      } else if (x<50) {
        return 1.15
      } else if(x<60) {
        return 1.1
      } else if(x<70) {
        return 1.05
      } else if(x<140) {
        return 1
      } else if(x<170) {
        return 0.9
      } else if(x<200) {
        return 0.7
      } else {
        return 0.5
      }

    }
  },
  data: {
    pickedOptions: _.sampleSize(options, 9)
  },
})