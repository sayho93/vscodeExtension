import java.util.*;
import java.util.stream.IntStream;

class Main {
    private Scanner scanner = new Scanner(System.in);
    private int[][] dp;


    public static void main(String... args){
        new Main().run();
    }

    private void run(){
        int cnt = scanner.nextInt();
        dp = new int[cnt + 1][3];
        for(int[] tmp: dp) Arrays.fill(tmp, 1);
        IntStream.range(2, cnt + 1).forEach(idx -> {
            dp[idx][0] = (dp[idx - 1][0] + dp[idx - 1][1] + dp[idx - 1][2]) % 9901;
            dp[idx][1] = (dp[idx - 1][0] + dp[idx - 1][2]) % 9901;
            dp[idx][2] = (dp[idx - 1][0] + dp[idx - 1][1]) % 9901;
        });
        System.out.println((dp[cnt][0] + dp[cnt][1] + dp[cnt][2]) % 9901);
    }
}
