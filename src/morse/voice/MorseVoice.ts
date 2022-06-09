import * as ko from 'knockout'
import { MorseVoiceInfo } from './MorseVoiceInfo'
export class MorseVoice {
  voices = []
  voicesInited:boolean = false
  voiceEnabled:ko.Observable<boolean>
  voiceCapable:ko.Observable<boolean>
  voiceThinkingTime:ko.Observable<number>
  voiceVoice:ko.Observable<any>
  voiceVolume:ko.Observable<number>
  voiceRate:ko.Observable<number>
  voicePitch:ko.Observable<number>
  voiceLang:ko.Observable<string>
  voiceVoices:ko.ObservableArray<any>
  voiceBuffer:Array<any>

  constructor () {
    this.voiceEnabled = ko.observable(false)
    this.voiceCapable = ko.observable((typeof speechSynthesis !== 'undefined'))
    this.voiceThinkingTime = ko.observable(0)
    this.voiceVoice = ko.observable()
    this.voiceVolume = ko.observable(10)
    this.voiceRate = ko.observable(1)
    this.voicePitch = ko.observable(1)
    this.voiceLang = ko.observable('en-us')
    this.voiceVoices = ko.observableArray([])
    this.voiceBuffer = []
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.addEventListener('voiceschanged', () => this.populateVoiceList())
    }
    this.populateVoiceList()
  }

  populateVoiceList = () => {
    if (typeof speechSynthesis === 'undefined') {
      return
    }

    const voicesTry = speechSynthesis.getVoices()

    if (voicesTry.length > 0) {
      this.voices = voicesTry
      // console.log(this.voices)
      this.voiceVoices(this.voices)
    }
  }

  getVoices = () => {
    // we assume this is all ready through the constructor by the time we use it
    const voices = speechSynthesis.getVoices()
    console.log(voices)
    return voices
  }

  initUtterance = (morseVoiceInfo) => {
    const utterance = new SpeechSynthesisUtterance()
    utterance.voice = morseVoiceInfo.voice || null // Note: some voices don't support altering params
    // utterance.voiceURI = morseVoiceInfo.voice && morseVoiceInfo.voice.voiceURI ? morseVoiceInfo.voice.voiceURI : 'native'
    utterance.volume = morseVoiceInfo.volume // 0 to 1
    utterance.rate = morseVoiceInfo.rate // 0.1 to 10
    utterance.pitch = morseVoiceInfo.pitch // 0 to 2
    utterance.text = morseVoiceInfo.textToSpeak
    utterance.lang = morseVoiceInfo.voice && morseVoiceInfo.voice.lang ? morseVoiceInfo.voice.lang : 'en-US'
    return utterance
  }

  speakInfo = (morseVoiceInfo) => {
    const utterance = this.initUtterance(morseVoiceInfo)
    utterance.addEventListener('end', morseVoiceInfo.onEnd)
    window.speechSynthesis.speak(utterance)
  }

  speakPhrase = (phraseToSpeak:string, onEndCallBack) => {
    const morseVoiceInfo = new MorseVoiceInfo()
    morseVoiceInfo.textToSpeak = phraseToSpeak
    morseVoiceInfo.voice = this.voiceVoice()
    morseVoiceInfo.volume = this.voiceVolume() / 10
    morseVoiceInfo.rate = this.voiceRate()
    morseVoiceInfo.pitch = this.voicePitch()
    morseVoiceInfo.onEnd = onEndCallBack
    this.speakInfo(morseVoiceInfo)
  }
}
