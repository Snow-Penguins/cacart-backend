import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(private readonly configService: ConfigService) {}

  public async getProductImageUrls(productNames: string[]): Promise<string[]> {
    try {
      const supabase = createClient(
        this.configService.get('SUPABASE_URL'),
        this.configService.get('SUPABASE_API_KEY'),
      );

      const productImgUrls = productNames.map((productName) => {
        const {
          data: { publicUrl = '' },
        } = supabase.storage
          .from('temp3')
          .getPublicUrl(`public/${productName}.jpg`);
        return publicUrl;
      });
      return productImgUrls;
    } catch (error) {
      console.log(error);
    }
  }

  public async signInWithGoogle() {
    try {
      const supabase = createClient(
        this.configService.get('SUPABASE_URL'),
        this.configService.get('SUPABASE_API_KEY'),
      );

      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
