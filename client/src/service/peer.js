class PeerService {
  constructor() {
    this.peer = null;
    this.initPeerConnection();
  }

  initPeerConnection() {
    if (this.isWebRTCSupported() && !this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  isWebRTCSupported() {
    return typeof window !== 'undefined' && !!window.RTCPeerConnection;
  }

  async getAnswer(offer) {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(offer);
        const ans = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;
      }
    } catch (error) {
      console.error("Error in getAnswer:", error);
    }
  }

  async setLocalDescription(ans) {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    } catch (error) {
      console.error("Error in setLocalDescription:", error);
    }
  }

  async getOffer() {
    try {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    } catch (error) {
      console.error("Error in getOffer:", error);
    }
  }
}

export default new PeerService();
