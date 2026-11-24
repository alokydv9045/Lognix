import { Problem, Submission } from "@/types";

export const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    acceptanceRate: 51.8,
    category: "Arrays & Hashing",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Apple", "Meta"],
    solved: true,
    bookmarked: true,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Can we use extra space? Can a hash map help us achieve O(n) time complexity?"
    ],
    starterCode: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Hash map lookup: O(n) time, O(n) space
        lookup = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in lookup:
                return [lookup[complement], i]
            lookup[num] = i
        return []
`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`,
      cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};
`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "nums = [2, 7, 11, 15], target = 9",
        expectedOutput: "[0, 1]"
      },
      {
        id: "tc_2",
        input: "nums = [3, 2, 4], target = 6",
        expectedOutput: "[1, 2]"
      },
      {
        id: "tc_3",
        input: "nums = [3, 3], target = 6",
        expectedOutput: "[0, 1]"
      }
    ]
  },
  {
    id: 20,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptanceRate: 40.5,
    category: "Stack",
    tags: ["String", "Stack"],
    companies: ["Amazon", "Microsoft", "Meta"],
    solved: true,
    bookmarked: false,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a LIFO data structure like a stack.",
      "When encountering an open bracket, push onto stack. When closing, verify against the top element."
    ],
    starterCode: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack
`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (c in map) {
      if (stack.pop() !== map[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}
`,
      cpp: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};
`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: 's = "()"',
        expectedOutput: "true"
      },
      {
        id: "tc_2",
        input: 's = "()[]{}"',
        expectedOutput: "true"
      },
      {
        id: "tc_3",
        input: 's = "(]"',
        expectedOutput: "false"
      }
    ]
  },
  {
    id: 53,
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    acceptanceRate: 50.4,
    category: "Dynamic Programming",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "LinkedIn"],
    solved: false,
    bookmarked: true,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Consider Kadane's algorithm.",
      "If the current prefix sum becomes negative, it cannot help future subarrays; reset it to 0."
    ],
    starterCode: {
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur_sum = 0
        max_sum = nums[0]
        for n in nums:
            cur_sum = max(n, cur_sum + n)
            max_sum = max(max_sum, cur_sum)
        return max_sum
`,
      javascript: `function maxSubArray(nums) {
  let cur = 0;
  let max = nums[0];
  for (const n of nums) {
    cur = Math.max(n, cur + n);
    max = Math.max(max, cur);
  }
  return max;
}
`,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int cur = 0, max_sum = nums[0];
        for (int n : nums) {
            cur = std::max(n, cur + n);
            max_sum = std::max(max_sum, cur);
        }
        return max_sum;
    }
};
`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = 0;
        int max = nums[0];
        for (int n : nums) {
            cur = Math.max(n, cur + n);
            max = Math.max(max, cur);
        }
        return max;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6"
      },
      {
        id: "tc_2",
        input: "nums = [1]",
        expectedOutput: "1"
      },
      {
        id: "tc_3",
        input: "nums = [5,4,-1,7,8]",
        expectedOutput: "23"
      }
    ]
  },
  {
    id: 704,
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    acceptanceRate: 56.9,
    category: "Binary Search",
    tags: ["Array", "Binary Search"],
    companies: ["Apple", "Bloomberg", "Google"],
    solved: true,
    bookmarked: false,
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    hints: [
      "Use two pointers, left and right. Compute mid = left + (right - left) // 2.",
      "Narrow the search window depending on whether nums[mid] is smaller or larger than target."
    ],
    starterCode: {
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
`,
      javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
`,
      cpp: `#include <vector>

class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};
`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "nums = [-1,0,3,5,9,12], target = 9",
        expectedOutput: "4"
      },
      {
        id: "tc_2",
        input: "nums = [-1,0,3,5,9,12], target = 2",
        expectedOutput: "-1"
      }
    ]
  },
  {
    id: 206,
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    acceptanceRate: 74.2,
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Google", "Bloomberg", "Uber"],
    solved: false,
    bookmarked: false,
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hints: [
      "Can you maintain prev, curr, and next pointers iteratively?"
    ],
    starterCode: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev
`,
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "head = [1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]"
      },
      {
        id: "tc_2",
        input: "head = [1,2]",
        expectedOutput: "[2,1]"
      }
    ]
  },
  {
    id: 3,
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptanceRate: 34.6,
    category: "Sliding Window",
    tags: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    solved: false,
    bookmarked: true,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Maintain a sliding window [left, right] using a hash set or last-seen index map."
    ],
    starterCode: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len
`,
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let max = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) {
      left = map.get(c) + 1;
    }
    map.set(c, right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char, int> map;
        int left = 0, max_len = 0;
        for (int right = 0; right < s.size(); ++right) {
            if (map.count(s[right]) && map[s[right]] >= left) {
                left = map[s[right]] + 1;
            }
            map[s[right]] = right;
            max_len = std::max(max_len, right - left + 1);
        }
        return max_len;
    }
};
`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, max = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            max = Math.max(max, right - left + 1);
        }
        return max;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: 's = "abcabcbb"',
        expectedOutput: "3"
      },
      {
        id: "tc_2",
        input: 's = "bbbbb"',
        expectedOutput: "1"
      },
      {
        id: "tc_3",
        input: 's = "pwwkew"',
        expectedOutput: "3"
      }
    ]
  },
  {
    id: 15,
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    acceptanceRate: 33.7,
    category: "Two Pointers",
    tags: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Meta", "Apple", "Microsoft"],
    solved: false,
    bookmarked: false,
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "Sort the array first to make duplicate elimination easy.",
      "Iterate through nums as the first element, then run two pointers on the remainder."
    ],
    starterCode: {
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif s < 0:
                    left += 1
                else:
                    right -= 1
        return res
`,
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}
`,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; ++i) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};
`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "nums = [-1,0,1,2,-1,-4]",
        expectedOutput: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        id: "tc_2",
        input: "nums = [0,1,1]",
        expectedOutput: "[]"
      }
    ]
  },
  {
    id: 42,
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    acceptanceRate: 60.1,
    category: "Two Pointers",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Goldman Sachs"],
    solved: false,
    bookmarked: true,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    hints: [
      "For each element, the water trapped depends on min(max_left, max_right) - height[i].",
      "Can we calculate this with two pointers in O(1) space?"
    ],
    starterCode: {
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
        l, r = 0, len(height) - 1
        l_max, r_max = height[l], height[r]
        water = 0
        while l < r:
            if l_max < r_max:
                l += 1
                l_max = max(l_max, height[l])
                water += l_max - height[l]
            else:
                r -= 1
                r_max = max(r_max, height[r])
                water += r_max - height[r]
        return water
`,
      javascript: `function trap(height) {
  let l = 0, r = height.length - 1;
  let lMax = height[l], rMax = height[r];
  let water = 0;
  while (l < r) {
    if (lMax < rMax) {
      l++;
      lMax = Math.max(lMax, height[l]);
      water += lMax - height[l];
    } else {
      r--;
      rMax = Math.max(rMax, height[r]);
      water += rMax - height[r];
    }
  }
  return water;
}
`,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int trap(std::vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int lMax = height[l], rMax = height[r];
        int water = 0;
        while (l < r) {
            if (lMax < rMax) {
                l++;
                lMax = std::max(lMax, height[l]);
                water += lMax - height[l];
            } else {
                r--;
                rMax = std::max(rMax, height[r]);
                water += rMax - height[r];
            }
        }
        return water;
    }
};
`,
      java: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int lMax = height[l], rMax = height[r];
        int water = 0;
        while (l < r) {
            if (lMax < rMax) {
                l++;
                lMax = Math.max(lMax, height[l]);
                water += lMax - height[l];
            } else {
                r--;
                rMax = Math.max(rMax, height[r]);
                water += rMax - height[r];
            }
        }
        return water;
    }
}
`
    },
    testCases: [
      {
        id: "tc_1",
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        expectedOutput: "6"
      },
      {
        id: "tc_2",
        input: "height = [4,2,0,3,2,5]",
        expectedOutput: "9"
      }
    ]
  }
];

export const RECENT_SUBMISSIONS: Submission[] = [
  {
    id: "sub_981",
    problemId: 1,
    problemTitle: "Two Sum",
    status: "AC",
    language: "python",
    runtimeMs: 48,
    memoryKb: 17800,
    code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        lookup = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in lookup:
                return [lookup[comp], i]
            lookup[num] = i
        return []`,
    timestamp: "10 mins ago"
  },
  {
    id: "sub_980",
    problemId: 20,
    problemTitle: "Valid Parentheses",
    status: "AC",
    language: "javascript",
    runtimeMs: 52,
    memoryKb: 42100,
    code: `function isValid(s) { ... }`,
    timestamp: "2 hours ago"
  },
  {
    id: "sub_979",
    problemId: 53,
    problemTitle: "Maximum Subarray",
    status: "WA",
    language: "cpp",
    runtimeMs: 112,
    memoryKb: 67900,
    code: `// Initial greedy attempt`,
    timestamp: "Yesterday"
  },
  {
    id: "sub_978",
    problemId: 704,
    problemTitle: "Binary Search",
    status: "AC",
    language: "python",
    runtimeMs: 220,
    memoryKb: 18400,
    code: `def search(nums, target): ...`,
    timestamp: "2 days ago"
  }
];

export const ACTIVITY_WEEKLY_DATA = [
  { day: "Mon", solved: 4, attempts: 7 },
  { day: "Tue", solved: 6, attempts: 11 },
  { day: "Wed", solved: 3, attempts: 5 },
  { day: "Thu", solved: 8, attempts: 14 },
  { day: "Fri", solved: 5, attempts: 8 },
  { day: "Sat", solved: 11, attempts: 16 },
  { day: "Sun", solved: 7, attempts: 10 }
];

export const TOPIC_PROGRESS_DATA = [
  { topic: "Arrays & Hashing", completed: 28, total: 35, percentage: 80 },
  { topic: "Two Pointers", completed: 18, total: 24, percentage: 75 },
  { topic: "Stack & Queue", completed: 15, total: 22, percentage: 68 },
  { topic: "Binary Search", completed: 14, total: 20, percentage: 70 },
  { topic: "Linked List", completed: 12, total: 25, percentage: 48 },
  { topic: "Trees & BST", completed: 16, total: 40, percentage: 40 },
  { topic: "Dynamic Programming", completed: 9, total: 45, percentage: 20 },
  { topic: "Graphs & BFS/DFS", completed: 6, total: 38, percentage: 15 }
];
