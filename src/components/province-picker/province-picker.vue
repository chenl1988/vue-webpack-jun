<template>
    <div :ref="dataRef" @click="showPicker" v-text="dataPlaceHolder">
    </div>
</template>

<script>
import Picker from "better-picker";

export default {
  props: {
    dataRef: {
      type: String,
      required: true
    },
    dataTitle: {
      type: String,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    dataPlaceHolder: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      picker: {},
      first: [],
      second: [],
      selectedIndex: [0, 0],
      checked: [0, 0],
      nameEl: {}
    };
  },
  mounted() {
    this._creatList(this.dataList, this.first);
    if (this.dataList[this.selectedIndex[0]].hasOwnProperty("sub")) {
      this._creatList(this.dataList[this.selectedIndex[0]].sub, this.second);
    } else {
      this.second = [{ text: "", value: 0 }];
    }
    setTimeout(() => {
      this.nameEl = this.$refs[this.dataRef];
      this.picker = new Picker({
        data: [this.first, this.second],
        selectedIndex: this.selectedIndex,
        title: this.dataTitle
      });
      this._initPickerEvents();
    }, 20);
  },
  methods: {
    showPicker() {
      this.picker.show();
    },
    _initPickerEvents() {
      this._pickerSelect();
      this._pickerChange();
    },
    _pickerSelect() {
      this.picker.on("picker.select", () => {
        var text1 = this.first[this.selectedIndex[0]].text;
        var text2 = this.second[this.selectedIndex[1]].text;

        this.nameEl.innerText = text1 + " " + text2;
        this.nameEl.style.color = "#333";
        this.$emit("selectChange", text1 + " " + text2);
      });
    },
    _pickerChange() {
      this.picker.on("picker.change", (index) => {
        if (index === 0) {
          this._firstChange();
        }
      });
    },
    _creatList(obj, list) {
      obj.forEach(function(item, index, arr) {
        var temp = new Object();
        temp.text = item.name;
        temp.value = index;
        list.push(temp);
      });
    },
    _firstChange() {
      this.second = [];
      this.checked[0] = this.selectedIndex;
      var firstCity = this.dataList[this.selectedIndex[0]];
      if (firstCity.hasOwnProperty("sub")) {
        this._creatList(firstCity.sub, this.second);

        var secondCity = this.dataList[this.selectedIndex[0]].sub[0];
      } else {
        second = [{ text: "", value: 0 }];
        this.checked[1] = 0;
      }

      this.picker.refillColumn(1, this.second);
      this.picker.scrollColumn(1, 0);
    }
  }
};
</script>

<style lang="less" scoped>
div {
  color: #8f8f8f;
}
</style>
