import { NextRequest, NextResponse } from 'next/server';
import { tradingBot } from '@/lib/trading-bot';

export async function POST(_request: NextRequest) {
  try {
    const success = await tradingBot.stop();
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Trading bot stopped successfully',
        status: tradingBot.getStatus(),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to stop trading bot',
        error: 'Bot may not be running',
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error stopping bot:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}