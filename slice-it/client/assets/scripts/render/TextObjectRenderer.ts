interface ContainerStyle {
  type: 'bubble' | 'cloud' | 'note' | 'neon' | 'gift';
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export const THEME_CONTAINER_STYLES: Record<string, ContainerStyle> = {
  'worker': {
    type: 'note',
    width: 160, height: 100,
    fontSize: 36, fontFamily: 'system-ui',
    textColor: '#333333'
  },
  'student': {
    type: 'bubble',
    width: 150, height: 110,
    fontSize: 34, fontFamily: 'system-ui',
    textColor: '#333333'
  },
  'life': {
    type: 'cloud',
    width: 160, height: 110,
    fontSize: 34, fontFamily: 'system-ui',
    textColor: '#555555'
  },
  'emo': {
    type: 'neon',
    width: 160, height: 100,
    fontSize: 36, fontFamily: 'system-ui',
    textColor: '#FFFFFF'
  },
  'love': {
    type: 'gift',
    width: 150, height: 110,
    fontSize: 34, fontFamily: 'system-ui',
    textColor: '#FFFFFF'
  },
  'custom': {
    type: 'bubble',
    width: 150, height: 100,
    fontSize: 34, fontFamily: 'system-ui',
    textColor: '#333333'
  }
};

export class TextObjectRenderer {
  static renderToCache(
    text: string, 
    containerStyle: ContainerStyle, 
    color: string
  ): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const canvas = wx.createCanvas();
      const ctx = canvas.getContext('2d');
      
      canvas.width = containerStyle.width;
      canvas.height = containerStyle.height;
      
      this.drawContainer(ctx, containerStyle, color);
      
      ctx.font = `bold ${containerStyle.fontSize}px "${containerStyle.fontFamily}"`;
      ctx.fillStyle = containerStyle.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let fontSize = containerStyle.fontSize;
      while (ctx.measureText(text).width > canvas.width * 0.8 && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px "${containerStyle.fontFamily}"`;
      }
      
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const img = wx.createImage();
      canvas.toTempFilePath({
        success: (res) => {
          img.onload = () => resolve(img);
          img.src = res.tempFilePath;
        },
        fail: () => {
          img.onload = () => resolve(img);
          img.src = canvas.toDataURL();
        }
      });
    });
  }
  
  private static drawContainer(ctx: any, style: ContainerStyle, color: string) {
    switch (style.type) {
      case 'bubble':
        this.drawBubble(ctx, style, color);
        break;
      case 'cloud':
        this.drawCloud(ctx, style, color);
        break;
      case 'note':
        this.drawNote(ctx, style, color);
        break;
      case 'neon':
        this.drawNeon(ctx, style, color);
        break;
      case 'gift':
        this.drawGift(ctx, style, color);
        break;
    }
  }
  
  private static drawBubble(ctx: any, style: ContainerStyle, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(style.width / 2, style.height / 2, Math.min(style.width, style.height) / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  private static drawCloud(ctx: any, style: ContainerStyle, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(style.width * 0.3, style.height * 0.5, style.height * 0.3, 0, Math.PI * 2);
    ctx.arc(style.width * 0.7, style.height * 0.5, style.height * 0.3, 0, Math.PI * 2);
    ctx.arc(style.width * 0.5, style.height * 0.4, style.height * 0.35, 0, Math.PI * 2);
    ctx.arc(style.width * 0.5, style.height * 0.6, style.height * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
  
  private static drawNote(ctx: any, style: ContainerStyle, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, style.width, style.height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, style.width, style.height);
  }
  
  private static drawNeon(ctx: any, style: ContainerStyle, color: string) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, style.width, style.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, style.width - 4, style.height - 4);
  }
  
  private static drawGift(ctx: any, style: ContainerStyle, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, style.width, style.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(style.width * 0.45, 0, style.width * 0.1, style.height);
    ctx.fillRect(0, style.height * 0.45, style.width, style.height * 0.1);
  }
}